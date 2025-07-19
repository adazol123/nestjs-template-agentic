import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'create_user' })
  create(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern({ cmd: 'find_all_users' })
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern({ cmd: 'find_user' })
  findOne(data: { id: string }) {
    return this.usersService.findOne(data.id);
  }

  @MessagePattern({ cmd: 'update_user' })
  update(data: { id: string } & UpdateUserDto) {
    const { id, ...updateUserDto } = data;
    return this.usersService.update(id, updateUserDto);
  }

  @MessagePattern({ cmd: 'delete_user' })
  remove(data: { id: string }) {
    return this.usersService.remove(data.id);
  }
}