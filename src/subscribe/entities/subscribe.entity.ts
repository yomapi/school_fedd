import { Entity, Column } from 'typeorm';
import { CustomBaseEntity } from '../../app.entity';
import { ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { School } from '../../school/entities/school.entity';

@Entity({ name: 'subscribe' })
export class Subscribe extends CustomBaseEntity {
  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => School)
  @JoinColumn()
  school: School;
}
