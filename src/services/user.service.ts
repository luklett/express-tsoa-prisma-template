import { User } from '@prisma/client';
import prisma from '../config/db';
import { CreateUserDto } from '../dtos/user/create-user.dto';
import { UpdateUserDto } from '../dtos/user/update-user.dto';

export class UsersService {
  findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  create(data: CreateUserDto): Promise<User> {
    return prisma.user.create({ data });
  }

  update(id: string, data: UpdateUserDto): Promise<User> {
    return prisma.user.update({ where: { id }, data });
  }

  delete(id: string): Promise<User> {
    return prisma.user.delete({ where: { id } });
  }
}
