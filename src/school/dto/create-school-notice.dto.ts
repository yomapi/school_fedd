import { IsString } from 'class-validator';
export class CreateSchoolNoticeDto {
  @IsString()
  readonly contents!: string;
}
