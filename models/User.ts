import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends Document {
    username: string;
    password: string;
    role: string;
    comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'User'], default: 'User' },
});

UserSchema.pre<IUser>('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
