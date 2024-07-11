import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The username of the user.' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The password of the user.' })
  password: string;
}
