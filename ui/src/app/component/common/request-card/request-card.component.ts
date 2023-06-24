import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MockApiDto } from 'src/app/model/dto/mock-api.dto';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.scss']
})
export class RequestCardComponent implements OnInit {

  @Input()
  active: boolean = false;

  @Input()
  data: MockApiDto = {
    request: {
      method: '',
      path: '',
      contentType: 'application/json'
    },
    response: {
      delayInSec: 0,
      statusCode: 200,
      contentType: 'application/json'
    },
  };

  @Output()
  cardClick = new EventEmitter<MockApiDto>();

  @Output()
  deleteClick = new EventEmitter<MockApiDto>();

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.cardClick.emit(this.data);
  }

  onDeleteClick() {
    this.deleteClick.emit(this.data);
  }

}
