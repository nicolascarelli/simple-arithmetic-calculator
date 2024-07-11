import { OperationType } from '../operation-type';
import { operations } from '../../common/constants';

export class Division extends OperationType {
  constructor() {
    super(operations.DIVISION.cost, operations.DIVISION.name);
  }

  calculate(...args: number[]): Promise<number> {
    return Promise.resolve(args.reduce((a, b) => a / b));
  }
}
