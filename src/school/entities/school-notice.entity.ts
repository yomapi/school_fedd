import { Entity, Column } from 'typeorm';
import { CustomBaseEntity } from '../../app.entity';
import { ManyToOne, JoinColumn } from 'typeorm';
import { School } from './school.entity';

@Entity({ name: 'school_notice' })
export class Notice extends CustomBaseEntity {
  @ManyToOne(() => School)
  @JoinColumn()
  school: School;

  @Column({ name: 'contents', type: 'text' })
  contents: string;
}
