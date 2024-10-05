import { Controller, HttpException, HttpStatus, Post, Req } from '@nestjs/common';
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
      // 여기서 예외를 던져 상태 코드와 메시지를 지정
      throw new HttpException(
        {
          success: false,
          message: `이미지 업로드 실패: ${error.message}`,
        },
        HttpStatus.BAD_REQUEST, // 400 상태 코드로 설정
      );
    }
  }
}
