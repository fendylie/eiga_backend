import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import {
  comparePassword,
  hashPassword,
} from '../../@utils/helpers/bcrypt.helper';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password: plainPassword, email, name, username } = createUserDto;

    return await this.usersRepository.save({
      email,
      name,
      username,
      password: await hashPassword(plainPassword),
    });
  }

  async findOneByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User | boolean> {
    const user = await this.usersRepository.findOne({ email });
    if (!user || !(await comparePassword(user.password, password))) {
      return false;
    }

    return user;
  }

  async findOneByUsernameAndPassword(
    username: string,
    password: string,
  ): Promise<User | boolean> {
    const user = await this.usersRepository.findOne({ username });
    if (!user || !(await comparePassword(user.password, password))) {
      return false;
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }

    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<void> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }

    await this.usersRepository.delete(id);
  }
}
