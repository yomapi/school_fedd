import { Entity, Column } from 'typeorm';
import { CustomBaseEntity } from '../../app.entity';
import { OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IdOnlyEntityDto } from '../../dto/id-only-entity-dto';
@Entity({ name: 'school' })
export class School extends CustomBaseEntity {
  @ApiProperty({ type: IdOnlyEntityDto })
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ApiProperty()
  @Column({ name: 'location', type: 'varchar', length: 30 })
  location: string;

  @ApiProperty()
  @Column({ name: 'name', type: 'varchar', length: 30 })
  name: string;
}
