import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from '../entities/record.entity';
import { RecordsService } from './records.service';
import { RecordsController } from './records.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Record])],
  providers: [RecordsService],
  exports: [RecordsService],
  controllers: [RecordsController],
})
export class RecordsModule {}
