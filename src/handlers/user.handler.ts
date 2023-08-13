import Exception from '../config/exception';
import { statusCode } from '../config/status-const';
import { CreateUserDto } from '../dtos/user/create-user.dto';
import { UpdateUserDto } from '../dtos/user/update-user.dto';
import { IUser } from '../interfaces/user/user.interface';
import { UsersService } from '../services/user.service';

export class UsersHandler {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  async findById(id: string): Promise<IUser> {
    const user = await this.usersService.findById(id);

    if (!user) {
      throw new Exception({
        message: 'User not found',
        status: statusCode.clientError.notFound
      });
    }

    return user;
  }

  async findByEmail(email: string): Promise<IUser> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new Exception({
        message: 'User not found',
        status: statusCode.clientError.notFound
      });
    }

    return user;
  }

  async create(data: CreateUserDto): Promise<IUser> {
    const user = await this.usersService.create(data);

    return user;
  }

  async update(id: string, data: UpdateUserDto): Promise<IUser> {
    const user = await this.usersService.update(id, data);

    return user;
  }

  async delete(id: string): Promise<IUser> {
    const user = await this.usersService.delete(id);

    return user;
  }
}
