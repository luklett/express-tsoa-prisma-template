import { UserType } from '@prisma/client';

export interface UserEntityResponse {
  id: string;
  email: string;
  name: string;
  type: `${UserType}`;
  createdAt: Date;
  updatedAt: Date;
}
