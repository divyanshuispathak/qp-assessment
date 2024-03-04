import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connect = (): void => {
    mongoose.connect(process.env.DATABASE_URL as string)
        .then(() => { console.log("DB connected successfully") })
        .catch((err: Error) => {
            console.log("DB CONNECTION ISSUES");
            console.error(err);
            process.exit(1);
        });
}
