import { Injectable, Req } from '@nestjs/common';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class ImgUploadService {
  private upload;

  constructor() {
    this.upload = multer({
      storage: multerS3({
        s3: new S3Client({
          region: process.env.AWS_REGION,
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          },
        }),
        contentType: multerS3.AUTO_CONTENT_TYPE,
        bucket: process.env.AWS_BUCKET_NAME,
        key: (request, file, cb) => {
          cb(null, `image/main/${Date.now().toString()}-${file.originalname}`);
        },
      }),
      // 최대 파일 크기 제한: 5MB (5 * 1024 * 1024 바이트)
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        const FILE_TYPE_REGEX = /jpeg|jpg|png|gif/;
        const mimetype = FILE_TYPE_REGEX.test(file.mimetype);
        const extname = FILE_TYPE_REGEX.test(
          file.originalname.split('.')[file.originalname.split('.').length - 1].toLowerCase(),
        );

        if (mimetype && extname) {
          return cb(null, true);
        } else {
          cb(new Error('이미지 형식이 유효하지 않습니다. (허용 형식: jpg, jpeg, png, gif)'));
        }
      },
    }).array('upload', 1);
  }

  async fileupload(@Req() req) {
    return new Promise((resolve, reject) => {
      this.upload(req, null, (error) => {
        if (error) {
          return reject(new Error(`이미지 업로드에 실패했습니다: ${error.message}`));
        }

        if (!req.files || req.files.length === 0) {
          return reject(new Error('업로드할 파일이 없습니다.'));
        }

        resolve(req.files[0].location);
      });
    });
  }
}
