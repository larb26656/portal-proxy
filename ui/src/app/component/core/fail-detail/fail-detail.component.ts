import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fail-detail',
  templateUrl: './fail-detail.component.html',
  styleUrls: ['./fail-detail.component.scss'],
})
export class FailDetailComponent implements OnInit {
  @Input()
  onRetryFn?: () => void;

  @Input()
  msg?: string;

  constructor() {}

  ngOnInit() {}
}
