import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.rolesService.create(createRoleDto);
  }

  @Get()
  async findAll() {
    return await this.rolesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const role = await this.rolesService.findOne(id);
    if (!role) {
      throw new NotFoundException();
    }

    return role;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    const role = await this.rolesService.findOne(id);
    if (!role) {
      throw new NotFoundException();
    }

    await this.rolesService.update(id, updateRoleDto);
    return await this.rolesService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const role = await this.rolesService.findOne(id);
    if (!role) {
      throw new NotFoundException();
    }

    await this.rolesService.delete(id);
    return 'Role deleted successfully';
  }
}
