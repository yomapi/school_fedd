import { IsString, IsEmail, Validate } from 'class-validator';
import { UserTypeValidator } from '../users.validator';
export class CreateUserDto {
  @IsEmail({}, { message: 'Incorrect email' })
  readonly email!: string;
  @IsString()
  readonly password!: string;
  @Validate(UserTypeValidator)
  readonly userType!: string;
}
