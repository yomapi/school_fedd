import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscribeDTO {
  @ApiProperty()
  @IsNumber()
  readonly schoolId: number;
}
