import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { DataLoaderData } from './model/data-loader-data';
import { DataLoaderStatus } from './model/data-loader-status';

@Component({
  selector: 'app-data-loader',
  templateUrl: './data-loader.component.html',
  styleUrls: ['./data-loader.component.scss'],
})
export class DataLoaderComponent implements OnInit {
  @ContentChild('idlePage', { static: true }) idlePage?: TemplateRef<any>;
  @ContentChild('loaderPage', { static: true }) loaderPage?: TemplateRef<any>;
  @ContentChild('failPage', { static: true }) failPage?: TemplateRef<any>;

  readonly DataLoaderStatus = DataLoaderStatus;

  @Input()
  data?: DataLoaderData<any>;

  constructor() {}

  checkParameter() {
    if (!this.data) {
      throw new Error('data is required!');
    }
  }

  ngOnInit() {
    this.checkParameter();
  }
}
