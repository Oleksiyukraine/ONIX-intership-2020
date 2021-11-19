import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  ownerId: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsArray()
  @ApiProperty()
  usersId: [string];
}
