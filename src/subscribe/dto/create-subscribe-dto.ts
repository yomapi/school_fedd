import { IsNumber } from 'class-validator';
export class CreateSubscribeDTO {
  @IsNumber()
  readonly schoolId: number;
}
