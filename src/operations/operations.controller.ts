import { OperationsService } from './operations.service';
import { CreateOperationDto } from './operation-create.dto';
import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Delete,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('v1/operations')
export class OperationsController {
  constructor(private readonly operationService: OperationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createOperationDto: CreateOperationDto, @Req() req) {
    const record = this.operationService.create(createOperationDto, req.user);
    return record;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req) {
    const numericId = parseInt(id, 10);
    await this.operationService.delete(numericId, req.user);
    return { message: 'Operation deleted successfully' };
  }
}
