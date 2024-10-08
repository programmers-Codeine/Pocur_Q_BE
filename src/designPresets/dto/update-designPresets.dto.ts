import { PartialType } from '@nestjs/mapped-types';
import { CreateDesignPresetDto } from './create-designPresets.dto';

export class UpdateDesignPresetDto extends PartialType(CreateDesignPresetDto) {}
