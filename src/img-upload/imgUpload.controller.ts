import { Controller, Post, Req, Res } from '@nestjs/common';
import { ImgUploadService } from './imgUpload.service';

@Controller('img-upload')
export class ImgUploadController {
  constructor(private readonly imgUploadService: ImgUploadService) {}

  @Post()
  async create(@Req() request, @Res() response) {
    try {
      await this.imgUploadService.fileupload(request, response);
    } catch (error) {
      return response.status(500).json(`Failed to upload image file: ${error.message}`);
    }
  }
}
