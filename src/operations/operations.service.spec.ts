import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, Connection, QueryRunner } from 'typeorm';
import { OperationsService } from './operations.service';
import { Operation } from '../entities/operation.entity';
import { UserService } from '../user/user.service';
import { RecordsService } from '../records/records.service';
import { User } from '../entities/user.entity';
import { Record } from '../entities/record.entity';
import { OperationFactory } from './operation-factory';
import { CreateOperationDto } from './operation-create.dto';
import { OperationType } from '../enums/operation-type.enum'; // Import the enum

describe('OperationsService', () => {
  let service: OperationsService;
  let operationRepository: Repository<Operation>;
  let userService: UserService;
  let recordsService: RecordsService;
  let connection: Connection;
  let queryRunner: QueryRunner;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OperationsService,
        {
          provide: getRepositoryToken(Operation),
          useClass: Repository,
        },
        {
          provide: UserService,
          useValue: {
            deductBalance: jest.fn(),
            addBalance: jest.fn(),
          },
        },
        {
          provide: RecordsService,
          useValue: {
            createRecord: jest.fn(),
            getRecordByOperationId: jest.fn(),
            deleteRecord: jest.fn(),
          },
        },
        {
          provide: Connection,
          useValue: {
            createQueryRunner: jest.fn().mockReturnValue({
              connect: jest.fn(),
              startTransaction: jest.fn(),
              commitTransaction: jest.fn(),
              rollbackTransaction: jest.fn(),
              release: jest.fn(),
            }),
          },
        },
      ],
    }).compile();

    service = module.get<OperationsService>(OperationsService);
    operationRepository = module.get<Repository<Operation>>(
      getRepositoryToken(Operation),
    );
    userService = module.get<UserService>(UserService);
    recordsService = module.get<RecordsService>(RecordsService);
    connection = module.get<Connection>(Connection);
    queryRunner = connection.createQueryRunner();
  });

  describe('delete', () => {
    it('should delete an operation and its associated record', async () => {
      const operationId = 1;
      const user = new User();
      const operation = new Operation(OperationType.ADDITION, 10); // Use enum value
      const record = new Record();

      jest.spyOn(operationRepository, 'findOne').mockResolvedValue(operation);
      jest
        .spyOn(recordsService, 'getRecordByOperationId')
        .mockResolvedValue(record);
      jest.spyOn(userService, 'addBalance').mockResolvedValue(undefined);
      jest
        .spyOn(operationRepository, 'softDelete')
        .mockResolvedValue(undefined);
      jest.spyOn(recordsService, 'deleteRecord').mockResolvedValue(undefined);

      await service.delete(operationId, user);

      expect(operationRepository.findOne).toHaveBeenCalledWith({
        where: { id: operationId },
      });
      expect(recordsService.getRecordByOperationId).toHaveBeenCalledWith(
        operationId,
      );
      expect(userService.addBalance).toHaveBeenCalledWith(user, 10);
      expect(operationRepository.softDelete).toHaveBeenCalledWith(operationId);
      expect(recordsService.deleteRecord).toHaveBeenCalledWith(record.id);
    });
  });
});
