import { Module } from '@nestjs/common';
import { DesignPresetsController } from './designPresets.controller';
import { DesignPresetsService } from './designPresets.service';

@Module({
  controllers: [DesignPresetsController],
  providers: [DesignPresetsService],
})
export class DesignPresetsModule {}
