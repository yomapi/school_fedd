import { IsString, MaxLength, MinLength } from 'class-validator';
export class CreateSchoolDto {
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  readonly location!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(30)
  readonly name!: string;
}
