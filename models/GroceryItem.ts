import mongoose, { Document, Schema } from 'mongoose';

export interface IGroceryItem extends Document {
    name: string;
    price: number;
    inventory: number;
    isInStock: () => boolean;
    decreaseInventory: (quantity: number) => boolean;
}

const GroceryItemSchema: Schema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    inventory: { type: Number, required: true },
});

GroceryItemSchema.methods.isInStock = function (): boolean {
    return this.inventory > 0;
};

GroceryItemSchema.methods.decreaseInventory = function (quantity: number): boolean {
    if (this.inventory >= quantity) {
        this.inventory -= quantity;
        return true;
    }
    return false;
};

export default mongoose.model<IGroceryItem>('GroceryItem', GroceryItemSchema);
