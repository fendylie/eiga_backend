import { PartialType } from '@nestjs/mapped-types';
import { CreateAccessLevelDto } from './create-access-level.dto';

export class UpdateAccessLevelDto extends PartialType(CreateAccessLevelDto) {}
