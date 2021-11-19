import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller('app')
export default class AppController {
  private start: number;

  constructor() {
    this.start = Date.now();
  }

  @Get('healthcheck')
  async healthcheck() {
    const now = Date.now();
    return {
      status: 'Vibe API Online',
      uptime: Number((now - this.start) / 1000).toFixed(0),
    };
  }
}
