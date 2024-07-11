import { OperationType } from '../operation-type';
import { operations } from '../../common/constants';
import axios from 'axios';

export class RandomString extends OperationType {
  constructor() {
    super(operations.RANDOM_STRING.cost, operations.RANDOM_STRING.name);
  }

  async calculate(length: number): Promise<string> {
    const response = await axios.get(
      `https://www.random.org/strings/?num=1&len=${length}&digits=on&upperalpha=on&loweralpha=on&unique=on&format=plain&rnd=new`,
    );
    return response.data;
  }
}
