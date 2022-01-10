import { Body, Controller, Post } from '@nestjs/common';
import { RegisterService } from '../services/register.service';
import { RegisterDto } from '../dto/register.dto';

@Controller('auth/register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async register(@Body() registerDto: RegisterDto) {
    await this.registerService.register(registerDto);
    return {
      message: 'Success created user',
    };
  }
}
