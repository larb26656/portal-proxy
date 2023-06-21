import { Injectable } from "@nestjs/common";
import { HttpMethod, MockApiDto } from "./model/mock-api.dto";

@Injectable()
export class MockApiRepository {

    private mockData: MockApiDto[] = [{
        method: "GET",
        path: "/setting",
        response: {
            statusCode: 200,
            contentType: "application/json",
            body: "{}"
        }
    }];

    get(): MockApiDto[] {
        return this.mockData;
    }

    findByReq(method: HttpMethod, path: string): MockApiDto {
        return this.mockData.find(e => e.method === method && e.path === path);
    }

}