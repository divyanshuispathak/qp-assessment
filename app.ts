import express, { Application } from 'express';
import { connect } from './config/database';
import userRoutes from './routes/userRoutes';
import groceryItemRoutes from './routes/groceryItemRoutes';
import orderRoutes from './routes/orderRoutes';
import cors from 'cors';

const app: Application = express();

// Connect to MongoDB
connect();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/items', groceryItemRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
