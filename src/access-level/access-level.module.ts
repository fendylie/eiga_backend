import { Module } from '@nestjs/common';
import { AccessLevelService } from './access-level.service';
import { AccessLevelController } from './access-level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessLevel } from './entities/access-level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccessLevel])],
  controllers: [AccessLevelController],
  providers: [AccessLevelService],
})
export class AccessLevelModule {}
