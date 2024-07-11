import { Controller, Get, UseGuards, Request, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RecordsService } from './records.service';

@Controller('v1/records')
export class RecordsController {
  constructor(private recordsService: RecordsService) {}

  /* 
  Just a start for this route
  */
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserRecords(
    @Request() req,
    @Query('filter') filter: any,
    @Query('sort') sort: any,
    @Query('pagination') pagination: any,
  ) {
    return this.recordsService.getUserRecords(
      req.user,
      filter,
      sort,
      pagination,
    );
  }
}
