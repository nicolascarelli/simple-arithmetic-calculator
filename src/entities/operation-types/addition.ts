import { OperationType } from '../operation-type';
import { operations } from '../../common/constants';

export class Addition extends OperationType {
  constructor() {
    super(operations.ADDITION.cost, operations.ADDITION.name);
  }

  calculate(...args: number[]): Promise<number> {
    return Promise.resolve(args.reduce((a, b) => a + b, 0));
  }
}
