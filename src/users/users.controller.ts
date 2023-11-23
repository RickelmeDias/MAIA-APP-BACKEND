import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() user: CreateUserDTO) {
    return this.usersService.create(user);
  }
}
