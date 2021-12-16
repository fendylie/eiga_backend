import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { RolesModule } from './roles/roles.module';
import { AccessLevelModule } from './access-level/access-level.module';
import { User } from './users/entities/user.entity';
import { Role } from './roles/entities/role.entity';
import { AccessLevel } from './access-level/entities/access-level.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'eiga',
      namingStrategy: new SnakeNamingStrategy(),
      entities: [User, Role, AccessLevel],
      synchronize: !['production'].includes(process.env.NODE_ENV),
    }),
    UsersModule,
    RolesModule,
    AccessLevelModule,
  ],
})
export class AppModule {}
