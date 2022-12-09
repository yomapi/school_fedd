import { IsString, IsEmail, Validate } from 'class-validator';
import { UserTypeValidator } from '../users.validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Incorrect email' })
  readonly email!: string;

  @ApiProperty()
  @IsString()
  readonly password!: string;

  @ApiProperty()
  @Validate(UserTypeValidator)
  readonly userType!: string;
}
