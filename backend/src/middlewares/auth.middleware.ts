import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { User } from '../models/user.model'; // Importe o modelo do usuário, caso necessário

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return; // Adicione um retorno após enviar a resposta
  }

  try {
    const decoded = verifyToken(token) as User;
    req.user = decoded;
    next(); // Passe o controle para o próximo middleware
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
    return; // Adicione um retorno após enviar a resposta
  }
}
