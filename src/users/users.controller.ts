import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.tdo';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import { ValidationError } from 'class-validator';

@Controller('users')
@UsePipes(
  new ValidationPipe({
    transform: true,
    exceptionFactory: (validationErrors: ValidationError[] = []) => {
      return new BadRequestException(
        validationErrors.map((error) => ({
          field: error.property,
          error: Object.values(error.constraints).join(', '),
        })),
      );
    },
  }),
)
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  async getUsers(@Res() res) {
    const users = await this.userService.getUsers();
    return res.json({
      success: true,
      data: users,
      message: 'Users retrieved successfully',
    });
  }

  @Get(':id')
  async getUser(@Param('id') id: string, @Res() res) {
    const user = await this.userService.getUser(+id);
    return res.json({
      success: true,
      data: user,
      message: 'User retrieved successfully',
    });
  }

  @Post()
  async createUser(@Body() body: CreateUserDto, @Res() res) {
    const saltRounds = 10;
    body.password = await bcrypt.hash(body.password, saltRounds);
    body.created_at = new Date().toISOString();
    body.updated_at = new Date().toISOString();
    const user = await this.userService.createUser(body);
    return res.status(201).json({
      success: true,
      data: user,
      message: 'User created successfully',
    });
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
    @Res() res,
  ) {
    const user = await this.userService.updateUser(+id, body);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User ${id} not found`,
      });
    }
    return res.json({
      success: true,
      data: user,
      message: 'User updated successfully',
    });
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Res() res) {
    const user = await this.userService.deleteUser(+id);
    return res.json({
      success: true,
      data: user,
      message: 'User deleted successfully',
    });
  }
}
