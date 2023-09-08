import { UserType } from '@prisma/client';

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  type?: `${UserType}`;
}
