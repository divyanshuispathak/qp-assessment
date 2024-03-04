"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const groceryItemRoutes_1 = __importDefault(require("./routes/groceryItemRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// Connect to MongoDB
(0, database_1.connect)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routes
app.use('/api/users', userRoutes_1.default);
app.use('/api/items', groceryItemRoutes_1.default);
app.use('/api/orders', orderRoutes_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
