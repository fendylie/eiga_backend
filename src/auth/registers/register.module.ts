import { Module } from '@nestjs/common';

import { UsersModule } from '../../users/users.module';
import { RegisterService } from './services/register.service';
import { RegisterController } from './controllers/register.controller';

@Module({
  imports: [UsersModule],
  controllers: [RegisterController],
  providers: [RegisterController, RegisterService],
})
export class RegisterModule {}
