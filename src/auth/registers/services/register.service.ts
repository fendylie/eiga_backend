import { Injectable } from '@nestjs/common';
import { UsersService } from '../../../users/services/users.service';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class RegisterService {
  constructor(private readonly usersService: UsersService) {}

  async register(registerDto: RegisterDto) {
    await this.usersService.create(registerDto);
  }
}
