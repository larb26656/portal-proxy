import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('curl')
  testCurl(): string {
    const { getMetaData } = require("curl-to-postmanv2");

    let meta = getMetaData(
      { type: "string", data: "" },
      (err, result) => {
        if (err) {
          console.log(err);

          process.exit(1);
        }
        console.log(result);
        console.log("data: ", result.output[0].data);
      }
    );
    return this.appService.getHello();
  }
}
