import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
//env
import dotenv from 'dotenv';
//get key from .env
dotenv.config();

const key: string = process.env.SECRET_KEY || "secret";

interface User {
  id: number;
  email: string;
}

declare global {
    namespace Express {
      interface Request {
        user?: User;
      }
    }
  }

function generateToken(user: User): string {
  const token = jwt.sign({ id: user.id, email: user.email }, key, { expiresIn: '1h' });
  return token;
}

function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, key) as User;
    req.user = decoded;
    next();
  } catch (error: any) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

function  getUserByToken(token: string) {
  const decoded = jwt.verify(token, key) as User;
  return decoded;
}

export { generateToken, verifyToken, getUserByToken };