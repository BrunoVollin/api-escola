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
  console.log(`this is req`,req);
  const authHeader = req.headers.authorization;
  console.log(`this is authHeader`,authHeader);

  if (!authHeader) {
    console.log(`Token não fornecido`);
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const [, token] = authHeader.split(' ');
  console.log(`this is token`,token);

  try {
    console.log(`this is key`,key);
    const decoded = jwt.verify(token, key) as User;
    console.log(`thi is decoded`,decoded);
    req.user = decoded;
    next();
  } catch (error: any) {
    console.log(error);
    return res.status(401).json({ message: 'Token inválido' });
  }
}

function  getUserByToken(token: string) {
  const decoded = jwt.verify(token, key) as User;
  console.log(decoded);
  return decoded;
}

export { generateToken, verifyToken, getUserByToken };