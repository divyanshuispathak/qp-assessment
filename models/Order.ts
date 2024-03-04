import mongoose, { Document, Schema } from 'mongoose';

interface IOrder extends Document {
    user: mongoose.Types.ObjectId;
    items: Array<{
        item: mongoose.Types.ObjectId;
        quantity: number;
    }>;
    createdAt: Date;
}

const OrderSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            item: { type: Schema.Types.ObjectId, ref: 'GroceryItem', required: true },
            quantity: { type: Number, required: true },
        },
    ],
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model < IOrder > ('Order', OrderSchema);
