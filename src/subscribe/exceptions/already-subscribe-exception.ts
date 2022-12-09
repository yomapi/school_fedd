import { BadRequestException } from '@nestjs/common';
export class AlreadySubsribedError extends BadRequestException {
  constructor(error?: string) {
    super('you alread subscirbe this school', error);
  }
}
