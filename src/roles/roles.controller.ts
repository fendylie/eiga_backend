import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('api/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    const newRole = await this.rolesService.create(createRoleDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Role created successfully',
      data: newRole,
    };
  }

  @Get()
  async findAll() {
    const roles = await this.rolesService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Role fetched successfully',
      data: roles,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const findRole = await this.rolesService.findOne(id);
    if (findRole) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Role found',
        data: findRole,
      };
    } else {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Role not found',
      };
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    const findRole = await this.rolesService.findOne(id);
    if (findRole) {
      await this.rolesService.update(id, updateRoleDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Role updated successfully',
        data: findRole,
      };
    } else {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Role not found',
      };
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const findRole = await this.rolesService.findOne(id);
    if (findRole) {
      await this.rolesService.delete(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Role deleted successfully',
      };
    } else {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Role not found',
      };
    }
  }
}
