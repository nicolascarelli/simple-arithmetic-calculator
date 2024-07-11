import { OperationType } from '../entities/operation-type';
import { Addition } from '../entities/operation-types/addition';
import { Subtraction } from '../entities/operation-types/substraction';
import { Multiplication } from '../entities/operation-types/multiplication';
import { Division } from '../entities/operation-types/division';
import { SquareRoot } from '../entities/operation-types/square-root';
import { RandomString } from '../entities/operation-types/random-string';
import { OperationType as OperationTypeEnum } from '../enums/operation-type.enum';

export class OperationFactory {
  static create(operationName: string): OperationType {
    switch (operationName) {
      case OperationTypeEnum.ADDITION:
        return new Addition();
      case OperationTypeEnum.SUBTRACTION:
        return new Subtraction();
      case OperationTypeEnum.MULTIPLICATION:
        return new Multiplication();
      case OperationTypeEnum.DIVISION:
        return new Division();
      case OperationTypeEnum.SQUARE_ROOT:
        return new SquareRoot();
      case OperationTypeEnum.RANDOM_STRING:
        return new RandomString();
      default:
        throw new Error(`Invalid operation name: ${operationName}`);
    }
  }
}
