import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { DataLoaderData } from 'src/app/component/core/data-loader/model/data-loader-data';
import { MockApiDto, createDefaultMockApiDto } from 'src/app/model/dto/mock-api.dto';
import { MockApiService } from 'src/app/service/mock-api/mock-api.service';
import { NotificationService } from 'src/app/service/notification/notification.service';
import {Dialog, DialogRef, DIALOG_DATA, DialogModule} from '@angular/cdk/dialog';
import { ImportMockApiDialogComponent } from './import-mock-api-dialog/import-mock-api-dialog.component';
import { read } from 'fs';
import { ErrorHandlerUtils } from 'src/app/utils/error-handler-utils';
import { mock } from 'node:test';
import { DeleteRequestDialogComponent } from './delete-request-dialog/delete-request-dialog.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  fetchMockApiDataLoader: DataLoaderData<MockApiDto[]> = new DataLoaderData();

  searchKeyword: string = '';

  mockApiDataList: MockApiDto[] = [];

  seletedId?: string;

  mockApiData?: MockApiDto;

  constructor(private readonly mockApiService: MockApiService, private readonly notificationService: NotificationService, public dialog: Dialog) { }

  ngOnInit() {
    this.fetchInitData();
  }

  onMockApiSelect(selectedMockApi?: MockApiDto) {
    this.mockApiData = selectedMockApi;
  }

  updateMockApiDataList() {
    this.mockApiDataList = this.fetchMockApiDataLoader?.data?.filter(e => e.request.path?.includes(this.searchKeyword)) ?? [];
  }

  onSearchChange() {
    this.updateMockApiDataList();
  }

  fetchInitData(): void {
    this.fetchMockApiDataLoader.setLoading();
    
    this.mockApiService.findAll().subscribe({
      next: (res) => {
        const data = res.data as MockApiDto[];
    
        this.fetchMockApiDataLoader.setIdle(data);
        this.updateMockApiDataList();
      },
      error: e => {
        const msg = ErrorHandlerUtils.getMsg(e);

        this.fetchMockApiDataLoader.setFail(msg);
      },
    });
  }

  add(mockApi?: MockApiDto) {
    let newData = mockApi;

    if (!newData) {
      newData = createDefaultMockApiDto();
    }

    this.onMockApiSelect(newData);
  }

  onAdd() {
    this.add();
  }

  onImport() {
    const dialogRef = this.dialog.open(ImportMockApiDialogComponent, {
      height: '400px',
      width: '600px',
      panelClass: 'my-dialog',
    });
    
    dialogRef.closed.subscribe(result => {
      if (result) {
        const data = result as MockApiDto;

        this.add(data);
      }
    });
  }

  onDelete(mockApi: MockApiDto) {
    const dialogRef = this.dialog.open(DeleteRequestDialogComponent, {
      height: '400px',
      width: '330px',
      panelClass: 'my-dialog',
      data: mockApi
    });
    
    dialogRef.closed.subscribe(result => {
      if (result) {
        this.onMockApiSelect(undefined);
        this.fetchInitData();
      }
    });
  }

  copy(mockApi: MockApiDto) {
    const newDto = JSON.parse(JSON.stringify(mockApi));

    delete newDto.id;

    this.onMockApiSelect(newDto);
  }

  onCopy(mockApi: MockApiDto) {
    this.copy(mockApi);
  }

}
