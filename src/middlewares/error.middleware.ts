import { Request, Response, NextFunction } from 'express';

export default function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err);
    res.status(500).json({ message: err.message });
}
