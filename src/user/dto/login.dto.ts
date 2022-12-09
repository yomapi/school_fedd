import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Incorrect email' })
  readonly email!: string;

  @ApiProperty()
  @IsString()
  readonly password!: string;
}
