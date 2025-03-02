import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export class ConfigDatabase {

    private readonly logger = new Logger(ConfigDatabase.name);

    private readonly mockApiDBPath: string;
    private readonly proxyDBPath: string;

    constructor(mockApiDBPath: string, proxyDBPath: string) {
        this.mockApiDBPath = mockApiDBPath;
        this.proxyDBPath = proxyDBPath;

        this.logger.debug(`mockApiDBPath is config to [${this.mockApiDBPath}]`);
        this.logger.debug(`proxyDBPath is config to [${this.proxyDBPath}]`);

        this.initDatasourceIfNotExist();
    }

    private createFileIfNotExists(filePath: string, content: string) {
        const directoryPath = path.dirname(filePath);

        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }
          
        if (!fs.existsSync(filePath)) {
            this.logger.debug(`create [${filePath}] cause file does not exist`);
            fs.writeFileSync(filePath, content, 'utf8');
        }
    }

    private initDatasourceIfNotExist() {
        this.createFileIfNotExists(this.mockApiDBPath, '[]');
        this.createFileIfNotExists(this.proxyDBPath, '{}');
    }

}