import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { MockApiEntity } from 'src/entity/mock-api.entity';
import { MockApiService } from './mock-api.service';
import { ApiResponseUtils } from 'src/utils/api-response-utils';

@Controller('api/mock-api/v1')
export class MockApiController {

    constructor(private readonly mockApiService: MockApiService) {

    }

    @Post()
    create(@Body() addReq: MockApiEntity) {
        return ApiResponseUtils.createDataSuccess(this.mockApiService.create(addReq));
    }
  
    @Get()
    findAll() {
        return ApiResponseUtils.fetchDataSuccess(this.mockApiService.findAll());
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
        return ApiResponseUtils.fetchDataSuccess(this.mockApiService.findOne(id));
    }
  
    @Put()
    update(@Param('id') id: string, @Body() updateReq: MockApiEntity) {
        return ApiResponseUtils.updateDataSuccess(this.mockApiService.update(updateReq));
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return ApiResponseUtils.removeDataSuccess(this.mockApiService.remove(id));
    }
}
