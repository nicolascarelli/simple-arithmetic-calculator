import { OperationType } from '../enums/operation-type.enum';
import { Entity, Column } from 'typeorm';
import { Base } from './base.entity';

@Entity()
export class Operation extends Base {
  @Column({
    type: 'enum',
    enum: OperationType,
  })
  type: OperationType;

  @Column('decimal')
  cost: number;

  constructor(type: OperationType, cost: number) {
    super();
    this.type = type;
    this.cost = cost;
  }
}
