import { PrismaClient, User as PrismaUser } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export type User = PrismaUser;

export class UserModel {
  async create(user: Omit<User, 'id'>): Promise<User> {
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (existingUser) {
      throw new Error('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    return prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  }
}
