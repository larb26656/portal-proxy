import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MockApiService } from 'src/feature/mock-api/mock-api.service';

@Injectable()
export class CoreMiddleware implements NestMiddleware {

  private readonly logger = new Logger(CoreMiddleware.name);

  constructor(private readonly mockApiService: MockApiService) {

  }

  use(req: Request, res: Response, next: NextFunction) {
    const method = req.method;
    const path = req.baseUrl;

    const mockApi = this.mockApiService.getByReq(method, path);

    const requestName = `[${method}:${path}]`;

    this.logger.debug(`Check ${requestName} is in mock api...`);
    if (mockApi) {
      this.logger.debug(`${requestName} is in mock api. return mock response.`);

      const mockApiRes = mockApi.response;

      res.status(mockApiRes.statusCode);
      res.header('content-type', mockApiRes.contentType);
      return res.send(mockApiRes.body);
    } else {
      this.logger.debug(`${requestName} isn't in mock api. forward to reverse proxy.`);

      const coreProxy = global.coreProxy;

      coreProxy.invokeProxy(req, res, next);
    }
  }
}