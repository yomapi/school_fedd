import { IsNumber } from 'class-validator';
export class PaginationRequestDto {
  @IsNumber()
  take: number;
  @IsNumber()
  page: number;
}
