import { IsEnum, IsNotEmpty } from 'class-validator';
import { OperationType } from '../enums/operation-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOperationDto {
  @IsEnum(OperationType)
  @IsNotEmpty()
  @ApiProperty({
    description: 'The type of the operation.',
    enum: OperationType,
  })
  type: OperationType;

  @ApiProperty({
    description: 'The arguments of the operation.',
    type: [Number],
  })
  args: number[];
}
