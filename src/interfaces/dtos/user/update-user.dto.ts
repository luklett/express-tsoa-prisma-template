import { UserType } from '@prisma/client';

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  type?: `${UserType}`;
}
