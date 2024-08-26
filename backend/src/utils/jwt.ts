import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

export function generateToken(user: User): string {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });
}

export function verifyToken(token: string): any {
  return jwt.verify(token, process.env.JWT_SECRET as string);
}
