import { Entity, Column, Unique } from 'typeorm';
import { Length, IsEmail, Validate } from 'class-validator';
import { CustomBaseEntity } from '../../app.entity';
import { UserTypeValidator } from '../users.validator';

@Entity({ name: 'users' })
@Unique(['email'])
export class User extends CustomBaseEntity {
  @Column({ name: 'email', type: 'varchar', length: 50 })
  @IsEmail({}, { message: 'Incorrect email' })
  email: string;

  @Column({ type: 'varchar', length: 255, comment: 'user password' })
  @Length(255)
  password: string;

  @Validate(UserTypeValidator)
  @Column({
    type: 'varchar',
    length: 1,
    comment: 'user type',
  })
  userType: string;
}
