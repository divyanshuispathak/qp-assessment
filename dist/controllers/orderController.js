"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const GroceryItem_1 = __importDefault(require("../models/GroceryItem"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { items } = req.body; // items is an array of objects with item ID and quantity
        // Validate items (check if they exist and are in stock)
        for (const item of items) {
            const groceryItem = yield GroceryItem_1.default.findById(item.item);
            if (!groceryItem) {
                return res.status(400).json({ message: `Item with ID ${item.item} does not exist.` });
            }
            if (item.quantity > groceryItem.inventory) {
                return res.status(400).json({ message: `Insufficient inventory for item with ID ${item.item}.` });
            }
        }
        // Create a new order in the database
        const order = new Order_1.default({ user: req.user._id, items });
        yield order.save();
        // Optionally, update the inventory levels of the items being ordered
        for (const item of items) {
            yield GroceryItem_1.default.findByIdAndUpdate(item.item, { $inc: { inventory: -item.quantity } });
        }
        res.status(201).json({ message: 'Order created successfully', order });
    }
    catch (error) {
        const err = error;
        console.error(err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});
exports.createOrder = createOrder;
