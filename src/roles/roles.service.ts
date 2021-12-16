import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<Role[]> {
    return await this.rolesRepository.find();
  }

  async findOne(id: string): Promise<Role> {
    return await this.rolesRepository.findOne(id);
  }

  async create(createRoleDto: CreateRoleDto) {
    const newRole = this.rolesRepository.create(createRoleDto);
    await this.rolesRepository.save(createRoleDto);
    return newRole;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    return await this.rolesRepository.update(id, updateRoleDto);
  }

  async delete(id: string): Promise<void> {
    await this.rolesRepository.softDelete(id);
  }
}
