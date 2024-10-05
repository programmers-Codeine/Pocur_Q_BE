import { Controller, Post, Req } from '@nestjs/common';
import { ImgUploadService } from './imgUpload.service';

@Controller('img-upload')
export class ImgUploadController {
  constructor(private readonly imgUploadService: ImgUploadService) {}

  @Post()
  async create(@Req() request) {
    try {
      const imageUrl = await this.imgUploadService.fileupload(request);
      return {
        success: true,
        message: '이미지 업로드 성공',
        data: {
          imageUrl,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: `이미지 업로드 실패: ${error.message}`,
      };
    }
  }
}
