import { ApiProperty } from '@nestjs/swagger';

export class IdOnlyEntityDto {
  @ApiProperty()
  readonly id!: number;
}
