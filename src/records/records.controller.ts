import { Controller, Get, UseGuards, Request, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RecordsService } from './records.service';
import { GetRecordsDto } from './records.dto';

@Controller('v1/records')
export class RecordsController {
  constructor(private recordsService: RecordsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserRecords(@Request() req, @Query() pagination: GetRecordsDto) {
    const sort = {
      field: pagination.sortField || 'id',
      order: pagination.sortOrder || 'ASC',
    };

    return await this.recordsService.getUserRecords(req.user, sort, pagination);
  }
}
