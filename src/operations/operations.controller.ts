import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OperationsService } from './operations.service';
import { CreateOperationDto } from './operation-create.dto';

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
}
