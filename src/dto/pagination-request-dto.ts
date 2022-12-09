import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationRequestDto {
  @ApiProperty()
  @IsNumber()
  take: number;

  @ApiProperty()
  @IsNumber()
  page: number;
}
