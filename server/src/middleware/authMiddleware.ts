import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

interface DecodedToken {
  id: string;
  role: string;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  verifyToken(req, res, () => {
    if ((req as any).user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    next();
  });
};
