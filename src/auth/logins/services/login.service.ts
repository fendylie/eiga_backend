import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../../../users/services/users.service';
import { LoginDto } from '../dto/login.dto';
import { User } from '../../../users/entities/user.entity';

@Injectable()
export class LoginService {
  constructor(private readonly usersService: UsersService) {}

  async login(loginDto: LoginDto): Promise<User> {
    const findUserByEmail = await this.usersService.findOneByEmailAndPassword(
      loginDto.username,
      loginDto.username,
    );
    const findUserByUsername =
      await this.usersService.findOneByUsernameAndPassword(
        loginDto.username,
        loginDto.username,
      );

    if (!findUserByEmail && !findUserByUsername) {
      throw new BadRequestException(
        'These credentials do not match our records.',
      );
    }

    if (findUserByUsername) return findUserByUsername;

    return findUserByEmail;
  }
}