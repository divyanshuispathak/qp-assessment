import { Router, Request, Response } from 'express';
import { createOrder } from '../controllers/orderController';
import { auth } from '../middlewares/auth';

const router = Router();

router.post('/', auth, createOrder);

export default router;
