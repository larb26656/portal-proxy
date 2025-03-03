import { Injectable } from '@nestjs/common';
import { APP_VERSION, APP_VERSION_COMMIT_HASH } from './constant/version';
import { VersionResDto } from './dto/version-res.dto';

@Injectable()
export class AppService {
  getHello(): string {
    const version = APP_VERSION;
    
    return `() Postal proxy () v.${version}`;
  }

  getVersion(): VersionResDto {
    return {
      version: APP_VERSION,
      commitHash: APP_VERSION_COMMIT_HASH
    };
  }

}
