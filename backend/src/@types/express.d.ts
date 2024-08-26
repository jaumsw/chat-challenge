import { User } from '../src/models/user.model'; // Importe o modelo do usuário, caso necessário

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}
