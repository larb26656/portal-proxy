import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MockApiService } from 'src/feature/mock-api/mock-api.service';
import { Delay } from 'src/utils/delay';

@Injectable()
export class CoreMiddleware implements NestMiddleware {

  private readonly logger = new Logger(CoreMiddleware.name);

  constructor(private readonly mockApiService: MockApiService) {

  }

  async use(req: Request, res: Response, next: NextFunction) {
    const method = req.method;
    const path = req.baseUrl;
    const contentType = req.headers['content-type'];
    const body = req.body;

    const requestName = `[${method}:${path}]`;

    this.logger.debug(`Check ${requestName} is in mock api...`);

    const mockApi = this.mockApiService.getByReq(method, path, contentType, body);
    
    if (mockApi) {
      // do mock
      this.logger.debug(`${requestName} is in mock api. return mock response.`);

      const mockApiRes = mockApi.response;

      res.status(mockApiRes.statusCode);
      res.header('content-type', mockApiRes.contentType);

      await Delay.sec(mockApiRes.delayInSec);

      return res.send(mockApiRes.body);
    } else {
      // do proxy
      this.logger.debug(`${requestName} isn't in mock api. forward to reverse proxy.`);

      const coreProxy = global.coreProxy;

      coreProxy.invokeProxy(req, res, next);
    }
  }
}