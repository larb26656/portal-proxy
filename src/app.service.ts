import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const version = process.env.npm_package_version;
    
    return `() Postal proxy () v.${version}`;
  }
}
