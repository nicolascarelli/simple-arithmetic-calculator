import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Operation } from './operation.entity';
import { Base } from './base.entity';

@Entity()
export class Record extends Base {
  @ManyToOne(() => Operation)
  @JoinColumn({ name: 'operation_id' })
  operation: Operation;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('decimal')
  amount: number;

  @Column('decimal')
  user_balance: number;

  @Column('text')
  operation_response: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  date: Date;
}
