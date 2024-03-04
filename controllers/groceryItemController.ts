import { Request, Response } from 'express';
import GroceryItem, { IGroceryItem } from '../models/GroceryItem';

export const getAllItems = async (req: Request, res: Response) => {
    try {
        const items = await GroceryItem.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const createItem = async (req: Request, res: Response) => {
    try {
        const { name, price, inventory } = req.body;
        const newItem = new GroceryItem({ name, price, inventory });

        await newItem.save();

        res.status(201).json({ message: 'Item added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateItem = async (req: Request, res: Response) => {
    try {
        const { name, price, inventory } = req.body;
        const item = await GroceryItem.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        item.name = name;
        item.price = price;
        item.inventory = inventory;

        await item.save();

        res.json({ message: 'Item updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteItem = async (req: Request, res: Response) => {
    try {
        const item = await GroceryItem.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        await (item as any).remove();

        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


