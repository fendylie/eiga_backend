import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { OneToOne } from 'typeorm';
import { Role } from '../../../roles/entities/role.entity';

export class RegisterDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @OneToOne(() => Role, (role) => role.id)
  roleId: string;
}
