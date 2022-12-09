import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthTokenDto {
  @IsString()
  @ApiProperty()
  readonly accessToken: string;
}
