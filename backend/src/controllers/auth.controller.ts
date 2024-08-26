import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    try {
      const user = await this.authService.register(name, email, password);
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
  
  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    try {
      const result = await this.authService.login(email, password);
      if (result) {
        return res.status(200).json(result);
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
