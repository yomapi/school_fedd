import { Entity, Column } from 'typeorm';
import { CustomBaseEntity } from '../../app.entity';
import { ManyToOne, JoinColumn } from 'typeorm';
import { School } from './school.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IdOnlyEntityDto } from '../../dto/id-only-entity-dto';

@Entity({ name: 'school_notice' })
export class Notice extends CustomBaseEntity {
  @ApiProperty({ type: IdOnlyEntityDto })
  @ManyToOne(() => School)
  @JoinColumn()
  school: School;

  @ApiProperty()
  @Column({ name: 'contents', type: 'text' })
  contents: string;
}
