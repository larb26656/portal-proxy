import { Injectable } from "@nestjs/common";
import { HttpMethod, MockApiDto } from "./model/mock-api.dto";
import * as fs from 'fs'

@Injectable()
export class MockApiRepository {

    find(): MockApiDto[] {
        const data = JSON.parse(fs.readFileSync('mock-api.json', 'utf8'));
        return data as MockApiDto[];
    }

    getByReq(method: HttpMethod, path: string): MockApiDto {
        const data = this.find();
        return data.find(e => e.method === method && e.path === path);
    }

}