import { PartialType } from '@nestjs/mapped-types';
import { CreateDesignDto } from './create-designs.dto';

export class UpdateDesignDto extends PartialType(CreateDesignDto) {}
