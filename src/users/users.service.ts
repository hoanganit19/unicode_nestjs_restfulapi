import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.tdo';
import { log } from 'node:console';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  getUsers(): Promise<any> {
    return this.prisma.user.findMany();
  }
  getUser(id: number): Promise<any> {
    return this.prisma.user.findFirst({ where: { id } });
  }
  createUser(body: CreateUserDto): Promise<any> {
    return this.prisma.user.create({ data: body });
  }
  async updateUser(id: number, body: UpdateUserDto): Promise<any> {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (!user) {
      return null;
    }
    return this.prisma.user.update({
      where: { id },
      data: body,
    });
  }
  deleteUser(id: number): Promise<any> {
    return this.prisma.user.delete({ where: { id } });
  }
}
