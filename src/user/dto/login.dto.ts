import { IsString, IsEmail } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Incorrect email' })
  readonly email!: string;
  @IsString()
  readonly password!: string;
}
