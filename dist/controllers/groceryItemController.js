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
exports.deleteItem = exports.updateItem = exports.createItem = exports.getAllItems = void 0;
const GroceryItem_1 = __importDefault(require("../models/GroceryItem"));
const getAllItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield GroceryItem_1.default.find();
        res.json(items);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getAllItems = getAllItems;
const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, inventory } = req.body;
        const newItem = new GroceryItem_1.default({ name, price, inventory });
        yield newItem.save();
        res.status(201).json({ message: 'Item added successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.createItem = createItem;
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, inventory } = req.body;
        const item = yield GroceryItem_1.default.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        item.name = name;
        item.price = price;
        item.inventory = inventory;
        yield item.save();
        res.json({ message: 'Item updated successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.updateItem = updateItem;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield GroceryItem_1.default.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        yield item.remove();
        res.json({ message: 'Item deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.deleteItem = deleteItem;
