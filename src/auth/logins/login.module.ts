import { Module } from '@nestjs/common';

import { UsersModule } from '../../users/users.module';
import { LoginService } from './services/login.service';
import { LoginController } from './controllers/login.controller';

@Module({
  imports: [UsersModule],
  controllers: [LoginController],
  providers: [LoginController, LoginService],
})
export class LoginModule {}
