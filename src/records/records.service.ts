import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Record } from '../entities/record.entity';
import { User } from '../entities/user.entity';
import { Operation } from 'src/entities/operation.entity';

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

  async deleteRecord(recordId: number): Promise<void> {
    await this.recordsRepository.softDelete(recordId);
  }

  async getUserRecords(
    user: User,
    sort: { field: string; order: 'ASC' | 'DESC' } = {
      field: 'id',
      order: 'ASC',
    },
    pagination: { page?: number; perPage?: number } = {},
  ): Promise<{ records: Record[]; totalRecords: number }> {
    const query = this.recordsRepository
      .createQueryBuilder('record')
      .leftJoinAndSelect('record.operation', 'operation')
      .where('record.deletedAt IS NULL AND  record.user_id = :userId', {
        userId: user.id,
      });

    const totalRecords = await query.getCount();

    query.orderBy(`record.${sort.field}`, sort.order);

    if (pagination.page && pagination.perPage) {
      query
        .skip((pagination.page - 1) * pagination.perPage)
        .take(pagination.perPage);
    }

    const records = await query.getMany();

    return { records, totalRecords };
  }

  async getRecordByOperationId(operationId: number): Promise<Record> {
    return this.recordsRepository.findOne({
      where: { operation: { id: operationId } },
      relations: ['operation'],
    });
  }
}
