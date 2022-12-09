import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSchoolDto {
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @ApiProperty()
  readonly location!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(30)
  @ApiProperty()
  readonly name!: string;
}
