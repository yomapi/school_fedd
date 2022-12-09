import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SuccessResDto {
  @IsString()
  @ApiProperty()
  readonly success: boolean;
}
