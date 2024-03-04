import { Request, Response } from 'express';
import Order from '../models/Order';
import GroceryItem from '../models/GroceryItem';

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { items } = req.body; // items is an array of objects with item ID and quantity

        // Validate items (check if they exist and are in stock)
        for (const item of items) {
            const groceryItem = await GroceryItem.findById(item.item);
            if (!groceryItem) {
                return res.status(400).json({ message: `Item with ID ${item.item} does not exist.` });
            }
            if (item.quantity > groceryItem.inventory) {
                return res.status(400).json({ message: `Insufficient inventory for item with ID ${item.item}.` });
            }
        }

        // Create a new order in the database
        const order = new Order({ user: req.user._id, items });
        await order.save();

        // Optionally, update the inventory levels of the items being ordered
        for (const item of items) {
            await GroceryItem.findByIdAndUpdate(item.item, { $inc: { inventory: -item.quantity } });
        }

        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        const err = error as Error;
        console.error(err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
