import { Injectable } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import { MockApiDto } from 'src/app/model/dto/mock-api.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MockApiService {

  private baseUrl = environment.baseApiUrl;

  constructor(private readonly http: HttpClient) { }

  create(addReq: MockApiDto) {
    const url = `${this.baseUrl}/api/mock-api/v1`;

    return this.http.post<any>(url, addReq);
  }

  findAll() {
    const url = `${this.baseUrl}/api/mock-api/v1`;

    return this.http.get<any>(url);
  }

  findOne(id: string) {
    const url = `${this.baseUrl}/api/mock-api/v1/${id}`;
    
    return this.http.get<any>(url);
  }

  update(updateReq: MockApiDto) {
    const url = `${this.baseUrl}/api/mock-api/v1`;
    
    return this.http.put<any>(url, updateReq);
  }

  remove(id: string) {
    const url = `${this.baseUrl}/api/mock-api/v1/${id}`;
    
    return this.http.delete<any>(url);
  }

}
