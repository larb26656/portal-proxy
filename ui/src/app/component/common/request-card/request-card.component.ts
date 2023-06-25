import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MockApiDto, createDefaultMockApiDto } from 'src/app/model/dto/mock-api.dto';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.scss']
})
export class RequestCardComponent implements OnInit {

  @Input()
  active: boolean = false;

  @Input()
  data: MockApiDto = createDefaultMockApiDto();

  @Output()
  cardClick = new EventEmitter<MockApiDto>();

  @ContentChild('activeActions', { static: true })
  activeActions?: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.cardClick.emit(this.data);
  }

}
