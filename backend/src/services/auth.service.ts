import { UserModel, User } from '../models/user.model';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';

export class AuthService {
  private userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  async register(name: string, email: string, password: string): Promise<User> {
    const user = await this.userModel.create({ name, email, password });
    return user;
  }

  async login(email: string, password: string): Promise<{ user: User, token: string } | null> {
    const user = await this.userModel.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const token = generateToken(user);
      return { user, token };
    }
    return null;
  }
}
