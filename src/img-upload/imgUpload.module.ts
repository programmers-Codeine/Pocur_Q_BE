import { Module } from '@nestjs/common';
import { ImgUploadController } from './imgUpload.controller';
import { ImgUploadService } from './imgUpload.service';

@Module({
  controllers: [ImgUploadController],
  providers: [ImgUploadService],
})
export class ImgUploadModule {}
