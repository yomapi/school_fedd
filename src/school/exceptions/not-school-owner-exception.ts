import { ForbiddenException } from '@nestjs/common';

export class NotSchoolOwnerError extends ForbiddenException {
  constructor(error?: string) {
    super('You are not adminstrator of this school', error);
  }
}
