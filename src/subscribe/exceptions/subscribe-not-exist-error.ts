import { BadRequestException } from '@nestjs/common';
export class SubscirbeNotExistError extends BadRequestException {
  constructor(error?: string) {
    super('you did not subscirbe this school', error);
  }
}
