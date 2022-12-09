import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSchoolNoticeDto {
  @ApiProperty()
  @IsString()
  readonly contents!: string;
}
