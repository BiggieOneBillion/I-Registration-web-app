import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersCustomersService } from './users-customers.service';
import { CreateUsersCustomerDto } from './dto/create-users-customer.dto';
import { UpdateUsersCustomerDto } from './dto/update-users-customer.dto';

@Controller('users-customers')

export class UsersCustomersController {
  constructor(private readonly usersCustomersService: UsersCustomersService) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  create(@Body() createUsersCustomerDto: CreateUsersCustomerDto) {
    return this.usersCustomersService.create(createUsersCustomerDto);
  }

  @Get()
  findAll() {
    return this.usersCustomersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersCustomersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsersCustomerDto: UpdateUsersCustomerDto) {
    return this.usersCustomersService.update(+id, updateUsersCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersCustomersService.remove(+id);
  }
}
