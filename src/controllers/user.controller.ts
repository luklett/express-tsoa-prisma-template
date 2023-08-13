import { Body, Delete, Get, Path, Post, Put, Query, Route, Tags } from 'tsoa';
import { CreateUserDto } from '../dtos/user/create-user.dto';
import { UpdateUserDto } from '../dtos/user/update-user.dto';
import { UsersHandler } from '../handlers/user.handler';
import { UserEntityResponse } from '../reponses/user/user-entity.response';

@Tags('Users')
@Route('/users')
export class UsersController {
  private userHandler: UsersHandler;

  constructor() {
    this.userHandler = new UsersHandler();
  }

  @Get(':id')
  getById(@Path() id: string): Promise<UserEntityResponse> {
    return this.userHandler.findById(id);
  }

  @Get()
  getByEmail(@Query() email: string): Promise<UserEntityResponse> {
    return this.userHandler.findByEmail(email);
  }

  @Post()
  create(@Body() body: CreateUserDto): Promise<UserEntityResponse> {
    return this.userHandler.create(body);
  }

  @Put(':id')
  update(@Path() id: string, @Body() body: UpdateUserDto): Promise<UserEntityResponse> {
    return this.userHandler.update(id, body);
  }

  @Delete(':id')
  delete(@Path() id: string): Promise<UserEntityResponse> {
    return this.userHandler.delete(id);
  }
}
