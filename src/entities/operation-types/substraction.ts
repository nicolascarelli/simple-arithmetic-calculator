import { OperationType } from '../operation-type';
import { operations } from '../../common/constants';

export class Subtraction extends OperationType {
  constructor() {
    super(operations.SUBTRACTION.cost, operations.SUBTRACTION.name);
  }

  calculate(...args: number[]): Promise<number> {
    return Promise.resolve(args.reduce((a, b) => a - b));
  }
}
