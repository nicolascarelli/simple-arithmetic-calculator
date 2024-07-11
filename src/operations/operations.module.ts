import { Module } from '@nestjs/common';
import { OperationsController } from './operations.controller';
import { OperationsService } from './operations.service';
import { Operation } from '../entities/operation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { RecordsModule } from '../records/records.module';

@Module({
  imports: [TypeOrmModule.forFeature([Operation]), AuthModule, RecordsModule],
  controllers: [OperationsController],
  providers: [OperationsService],
})
export class OperationsModule {}
