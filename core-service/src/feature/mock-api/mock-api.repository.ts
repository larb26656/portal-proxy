import { Injectable } from "@nestjs/common";
import { MockApiEntity } from "../../entity/mock-api.entity";
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MockApiRepository {

    // TODO refactor this with real db

    find(): MockApiEntity[] {
        const dataList: MockApiEntity[] = JSON.parse(fs.readFileSync(global.configDatabase.mockApiDBPath, 'utf8'));

        return dataList 
    }

    findById(id: string): MockApiEntity {
        const dataList = this.find();

        return dataList.find(data => data.id === id);
    }

    private generateId(): string {
        return uuidv4();
    }

    private updateDB(newDataList: MockApiEntity[]) {
        const content = JSON.stringify(newDataList);

        fs.writeFileSync(
            global.configDatabase.mockApiDBPath,
            content,
            'utf8'
        );
    }

    save(entity: MockApiEntity): MockApiEntity {
        const dataList = this.find();

        const id = entity.id;

        if (id) {
            const targetIndex = dataList.findIndex(e => e.id === id);
            
            dataList[targetIndex] = entity;
        } else {
            entity.id = this.generateId();

            dataList.push(entity);
        }

        this.updateDB(dataList);

        return entity;
    }

    deleteById(id: string): void {
        const dataList = this.find();

        const newDataList = dataList.filter(data => data.id !== id);

        this.updateDB(newDataList);
    }

    getByReq(method: string, path: string): MockApiEntity {
        const dataList = this.find();
    
        return dataList.find(e => e.request.method === method && e.request.path === path && e.isActive);
    }

}