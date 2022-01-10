import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from '../services/login.service';
import { LoginDto } from '../dto/login.dto';

@Controller('auth/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body() registerDto: LoginDto) {
    return await this.loginService.login(registerDto);
  }
}
