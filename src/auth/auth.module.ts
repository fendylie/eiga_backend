import { Module } from '@nestjs/common';
import { RegisterModule } from './registers/register.module';
import { LoginModule } from './logins/login.module';

@Module({
  imports: [RegisterModule, LoginModule],
})
export class AuthModule {}
