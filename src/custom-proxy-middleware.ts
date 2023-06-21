import * as fs from 'fs'
import { Request, Response, NextFunction } from 'express';
import { RequestHandler, createProxyMiddleware } from 'http-proxy-middleware';
import { Logger } from '@nestjs/common';

export class CustomProxyMiddleware {

    private readonly logger = new Logger(CustomProxyMiddleware.name);

    private readonly configPath: string;

    private proxyMiddlewareRegistation: Record<string, ProxyMiddlewareHolder> = {};

    constructor(configPath: string) {
        this.configPath = configPath;
        this.bootstrap();
    }

    private loadConfig() {
        const data = JSON.parse(fs.readFileSync(this.configPath, 'utf8'));
    
        return data;
    }


    private registerProxy(config: any) {
        for (const [key, value] of Object.entries(config)) {
            this.proxyMiddlewareRegistation[key] = {
                config: value,
                middlewareFn: createProxyMiddleware(value)
            }
        }
    }

    getProxyRegistationList() {
        const dataList = [];

        for (const pathPattern in this.proxyMiddlewareRegistation) {
            const proxy = this.proxyMiddlewareRegistation[pathPattern];
            
            dataList.push({
                path: pathPattern,
                config: proxy.config
            });
        }

        return dataList;
    }
    
    private bootstrap() {
        const config = this.loadConfig();

        this.registerProxy(config);

        const registationList = this.getProxyRegistationList();

        this.logger.debug(`Proxy register info : ${JSON.stringify(registationList)}`);
    }

    private checkInPathPattern(path: string, pattern: string) {
        return path.startsWith(pattern);
    }

    private getMatchProxy(path: string): RequestHandler {
        for (const pathPattern in this.proxyMiddlewareRegistation) {

            if (this.checkInPathPattern(path, pathPattern)) {
                const proxy = this.proxyMiddlewareRegistation[pathPattern];

                return proxy.middlewareFn;
            }
        }

        return null;
    }

    invokeProxy(req: Request, res: Response, next: NextFunction) {
        const path = req.baseUrl;

        this.proxyMiddlewareRegistation.for
        
        const matchProxy = this.getMatchProxy(path);

        if (matchProxy) {
            matchProxy(req, res, next);
        } else {
            next();
        }
    };
}

interface ProxyMiddlewareHolder {
    config: any;
    middlewareFn: RequestHandler
}
