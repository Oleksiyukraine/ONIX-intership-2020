import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class ConnectToRoomDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  roomId: string;
}
