import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecordsService } from './records.service';
import { Record } from '../entities/record.entity';
import { User } from '../entities/user.entity';
import { Operation } from '../entities/operation.entity';
import { OperationType } from '../enums/operation-type.enum';

describe('RecordsService', () => {
  let service: RecordsService;
  let repository: Repository<Record>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecordsService,
        {
          provide: getRepositoryToken(Record),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<RecordsService>(RecordsService);
    repository = module.get<Repository<Record>>(getRepositoryToken(Record));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createRecord', () => {
    it('should create and save a new record', async () => {
      const operation = new Operation(OperationType.ADDITION, 10); // Provide required arguments

      const user = new User();
      user.balance = 100;

      const result = 'result';

      const record = new Record();
      jest.spyOn(repository, 'save').mockResolvedValue(record);

      const createdRecord = await service.createRecord(operation, user, result);

      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          operation,
          user,
          operation_response: result.toString(),
          amount: operation.cost,
          user_balance: user.balance,
          date: expect.any(Date),
        }),
      );
      expect(createdRecord).toBe(record);
    });
  });

  describe('deleteRecord', () => {
    it('should soft delete a record', async () => {
      const recordId = 1;
      jest.spyOn(repository, 'softDelete').mockResolvedValue(undefined);

      await service.deleteRecord(recordId);

      expect(repository.softDelete).toHaveBeenCalledWith(recordId);
    });
  });

  describe('getUserRecords', () => {
    it('should return user records with pagination and sorting', async () => {
      const user = new User();
      user.id = 1;

      const records = [new Record()];
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getCount: jest.fn().mockResolvedValue(1),
        orderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(records),
      } as any);

      const result = await service.getUserRecords(
        user,
        { field: 'id', order: 'ASC' },
        { page: 1, perPage: 10 },
      );

      expect(result).toEqual({ records, totalRecords: 1 });
    });
  });

  describe('getRecordByOperationId', () => {
    it('should return a record by operation ID', async () => {
      const operationId = 1;
      const record = new Record();
      jest.spyOn(repository, 'findOne').mockResolvedValue(record);

      const result = await service.getRecordByOperationId(operationId);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { operation: { id: operationId } },
        relations: ['operation'],
      });
      expect(result).toBe(record);
    });
  });
});
