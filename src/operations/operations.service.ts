import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { Operation } from '../entities/operation.entity';
import { CreateOperationDto } from './operation-create.dto';
import { User } from '../entities/user.entity';
import { OperationFactory } from './operation-factory';
import { UserService } from '../user/user.service';
import { RecordsService } from '../records/records.service';
import { Record } from '../entities/record.entity';

@Injectable()
export class OperationsService {
  constructor(
    @InjectRepository(Operation)
    private operationRepository: Repository<Operation>,
    private userService: UserService,
    private recordsService: RecordsService,
    private connection: Connection,
  ) {}

  async create(
    createOperationDto: CreateOperationDto,
    user: User,
  ): Promise<Record> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const operationType = OperationFactory.create(createOperationDto.type);

      await this.userService.deductBalance(user, operationType.cost);
      const result = await operationType.calculate(...createOperationDto.args);

      let operation = new Operation(
        createOperationDto.type,
        operationType.cost,
      );
      operation = await this.operationRepository.save(operation);

      const record = await this.recordsService.createRecord(
        operation,
        user,
        result,
      );

      return record;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
