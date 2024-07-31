import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findOne(username: string): Promise<User> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async deductBalance(user: User, amount: number): Promise<User> {
    if (user.balance < amount) {
      throw new HttpException(
        'Insufficient balance for this operation',
        HttpStatus.BAD_REQUEST,
      );
    }
    user.balance -= amount;
    return this.usersRepository.save(user);
  }

  async addBalance(user: User, amount: number): Promise<User> {
    user.balance += amount;
    return this.usersRepository.save(user);
  }
}
