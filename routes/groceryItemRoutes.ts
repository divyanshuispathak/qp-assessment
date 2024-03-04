import { Router, Request, Response } from 'express';
import { getAllItems } from '../controllers/groceryItemController';
import { auth, admin } from '../middlewares/auth';

const router = Router();

router.get('/', getAllItems);
router.post('/', auth, admin, (req: Request, res: Response) => {
    // Placeholder for creating a new grocery item
    res.send('Create a new grocery item');
});

export default router;
