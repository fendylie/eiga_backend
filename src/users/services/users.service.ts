import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import {
  comparePassword,
  hashPassword,
} from '../../@utils/helpers/bcrypt.helper';

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
    const {
      password: plainPassword,
      email,
      name,
      username,
      roleId,
    } = createUserDto;

    return await this.usersRepository.save({
      email,
      name,
      username,
      roleId,
      password: await hashPassword(plainPassword),
    });
  }

  async findOneByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User> {
    const user = await this.usersRepository.findOne({ email });
    if (!user || !(await comparePassword(user.password, password))) {
      throw new NotFoundException();
    }

    return user;
  }

  async findOneByUsernameAndPassword(
    username: string,
    password: string,
  ): Promise<User> {
    const user = await this.usersRepository.findOne({ username });
    if (!user || !(await comparePassword(user.password, password))) {
      throw new NotFoundException();
    }

    return user;
  }

  async remove(id: string): Promise<void> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }

    await this.usersRepository.delete(id);
  }
}
