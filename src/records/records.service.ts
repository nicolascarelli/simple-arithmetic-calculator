import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Operation } from '../entities/operation.entity';
import { Record } from '../entities/record.entity';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(Record)
    private recordsRepository: Repository<Record>,
  ) {}

  async createRecord(
    operation: Operation,
    user: User,
    result: string | number,
  ): Promise<Record> {
    const record = new Record();
    record.operation = operation;
    record.user = user;
    record.operation_response = result.toString();
    record.amount = operation.cost;
    record.user_balance = user.balance;
    record.date = new Date();

    return this.recordsRepository.save(record);
  }

  async getUserRecords(
    user: User,
    filter: any,
    sort: any,
    pagination: any,
  ): Promise<Record[]> {
    let query = this.recordsRepository.createQueryBuilder('record');

    if (filter) {
      query = query.where({ user: user.id, ...filter });
    }

    if (sort) {
      query = query.orderBy(sort);
    }

    if (pagination) {
      query = query.skip(pagination.skip).take(pagination.take);
    }

    return query.getMany();
  }
}
