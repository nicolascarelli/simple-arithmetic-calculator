import { OperationType } from '../operation-type';
import { operations } from '../../common/constants';

export class SquareRoot extends OperationType {
  constructor() {
    super(operations.SQUARE_ROOT.cost, operations.SQUARE_ROOT.name);
  }

  calculate(num: number): Promise<number> {
    return Promise.resolve(Math.sqrt(num));
  }
}
