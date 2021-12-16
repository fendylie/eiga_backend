import { Body, Controller, Post } from '@nestjs/common';
import { RegisterService } from '../services/register.service';
import { RegisterDto } from '../dto/register.dto';

@Controller('auth/register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  register(@Body() registerDto: RegisterDto) {
    return this.registerService.register(registerDto);
  }
}
