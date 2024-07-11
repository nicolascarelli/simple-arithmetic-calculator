import { UserStatus } from '../enums/user-status.enum';
import { Entity, Column } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Base } from './base.entity';
import { defaultBalance } from '../common/constants';

@Entity()
export class User extends Base {
  @Column({ unique: true })
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: defaultBalance })
  balance: number;
}
