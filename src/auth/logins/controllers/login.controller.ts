import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from '../services/login.service';
import { LoginDto } from '../dto/login.dto';

@Controller('auth/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  login(@Body() registerDto: LoginDto) {
    return this.loginService.login(registerDto);
  }
}
