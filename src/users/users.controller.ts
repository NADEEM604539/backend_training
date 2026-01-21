import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
   @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() createUserDto: CreateUserDto) {
    return new UserEntity(await this.usersService.create(createUserDto));
  }

  @Get()
  @ApiOkResponse({ type: [UserEntity] })
  async findAll() {
    const users= await this.usersService.findAll();
    return users.map((user) => new UserEntity(user));
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity , isArray: true})
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    return user ? new UserEntity(user) : null;
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: UserEntity })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param('id') id: string) {
    return new UserEntity(await this.usersService.remove(+id));
  }
}
