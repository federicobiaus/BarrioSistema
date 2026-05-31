import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import {
  JwtAuthGuard,
} from '../common/guards/jwt-auth.guard';

import {
  RolesGuard,
} from '../common/guards/roles.guard';

import {
  Roles,
} from '../common/decorators/roles.decorator';

import {
  Role,
} from '../common/enums/role.enum';

import cloudinary from './config/cloudinary.config';

@Controller('uploads')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UploadsController {
  @Post('image')
  @Roles(Role.ADMIN, Role.OWNER)
  @UseInterceptors(
    FileInterceptor('file', {
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
  fileFilter: (
    req,
    file,
    callback,
  ) => {
    const allowed =
      ['image/jpeg', 'image/png'];

    if (
      !allowed.includes(file.mimetype)
    ) {
      return callback(
        new BadRequestException(
          'Solo JPG y PNG',
        ),
        false,
      );
    }

    callback(null, true);
  },
}),
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException(
        'Archivo requerido',
      );
    }

    const base64 =
      file.buffer.toString('base64');

    const dataUri =
      `data:${file.mimetype};base64,${base64}`;

    const result =
      await cloudinary.uploader.upload(
        dataUri,
        {
          folder: 'barrio-system',
        },
      );

    return {
      url: result.secure_url,
    };
  }
}