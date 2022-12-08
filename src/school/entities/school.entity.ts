import { Entity, Column } from 'typeorm';
import { CustomBaseEntity } from '../../app.entity';
import { OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity({ name: 'school' })
export class School extends CustomBaseEntity {
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({ name: 'location', type: 'varchar', length: 30 })
  location: string;

  @Column({ name: 'name', type: 'varchar', length: 30 })
  name: string;
}
