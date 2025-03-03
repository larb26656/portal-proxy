import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { VersionResDto } from './dto/version-res.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('version')
  getVersion(): VersionResDto {
    return this.appService.getVersion();
  }
}
