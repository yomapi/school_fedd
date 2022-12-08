import { BadRequestException } from '@nestjs/common';
export class NoticeNotExistError extends BadRequestException {
  constructor(error?: string) {
    super('Notice is not exist', error);
  }
}
