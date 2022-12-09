import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserInfoDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Incorrect email' })
  readonly email!: string;
}
