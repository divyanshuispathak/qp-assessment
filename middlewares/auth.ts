import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) return res.status(401).send('Access Denied');

        const verified = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

export const admin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        res.status(403).send('Access Denied');
    }
};
