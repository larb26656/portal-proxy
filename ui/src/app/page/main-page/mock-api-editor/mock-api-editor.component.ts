import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CodeModel } from '@ngstack/code-editor';
import { MockApiDto } from '../../../model/dto/mock-api.dto';
import { NotificationService } from '../../../service/notification/notification.service';
import { MockApiService } from 'src/app/service/mock-api/mock-api.service';
import { finalize } from 'rxjs';
import { MainPageComponent } from '../main-page.component';

@Component({
  selector: 'app-mock-api-editor',
  templateUrl: './mock-api-editor.component.html',
  styleUrls: ['./mock-api-editor.component.scss']
})
export class MockApiEditorComponent implements OnInit, OnChanges {

  theme = 'vs-dark';

  bodyCodeModel: CodeModel = {
    language: 'json',
    uri: 'main.json',
    value: '{}'
  };

  options = {
    contextmenu: true,
  };

  @Input() data: MockApiDto = {
    response: {}
  };

  methods: string[] = [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE'
  ] 

  responseContentTypes: string[] = ['application/json'];

  readonly mockApiForm: FormGroup<MockApiFormModel>

  setBodyValue(value: string) {
    const newIntance = JSON.parse(JSON.stringify(this.bodyCodeModel));

    newIntance.value = value;

    this.bodyCodeModel = newIntance;
  }

  onBodyChanged(value: string) {
    const previousValue = this.mockApiForm.controls.body.value;

    if (previousValue != value) {
      this.mockApiForm.controls.body.patchValue(value);
      this.mockApiForm.markAsDirty();
    }
   
  }

  constructor(
    private readonly fb: FormBuilder, 
    private readonly notificationService: NotificationService,
    private readonly mockApiService: MockApiService,
    private readonly mainPageComponent: MainPageComponent
    ) {
    this.mockApiForm = fb.group<MockApiFormModel>({
      method: fb.control('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      path: fb.control<string>('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      description: fb.control<string>('', {
        validators: [],
        nonNullable: true,
      }),
      statusCode: fb.control<number>(0, {
        validators: [Validators.required],
        nonNullable: true,
      }),
      responseContentType: fb.control<string>('', {
        validators: [],
        nonNullable: true,  
      }),
      body: fb.control<string>('', {
        validators: [],
        nonNullable: true,
      }),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const data = changes['data'];

    if (data.currentValue !== data.previousValue) {
      this.initFormData();
    }
  }

  ngOnInit(): void {
  }

  initFormData() {
    this.mockApiForm.reset();

    this.mockApiForm.patchValue({
      method: this.data.method ?? '',
      path: this.data.path ?? '',
      description: this.data.description ?? '',
      statusCode: this.data.response.statusCode ?? 0,
      responseContentType: this.data.response.contentType ?? '',
      body: this.data.response.body ?? '',
    })

    this.setBodyValue(this.data.response.body ?? '');
  }

  onClose() {
    this.mainPageComponent.mockApiData = undefined;
  }

  save() {
    this.notificationService.startSpinner();
    
    let saveObs$;

    const formValue = {
      id: this.data.id,
      method: this.mockApiForm.controls.method.value,
      path: this.mockApiForm.controls.path.value,
      description: this.mockApiForm.controls.description.value,
      response: {
        statusCode: this.mockApiForm.controls.statusCode.value,
        contentType: this.mockApiForm.controls.responseContentType.value,
        body: this.mockApiForm.controls.body.value
      }
    };

    if (this.data.id) {
      saveObs$ = this.mockApiService.update(
        formValue
      );
    } else {
      saveObs$ = this.mockApiService.create(
        formValue
      );
    }

    saveObs$.pipe(
      finalize(() => this.notificationService.stopSpinner())
    ).subscribe({
      next: res => {
        const data = res.data;

        // set new data
        this.data = data;
        this.initFormData();

        this.mainPageComponent.fetchInitData();
      },
      error: (e) => {
        console.log(`Error: ${e}`);
      }
    });
  }

  onSave() {
    console.log('onSave');

    if (this.mockApiForm.invalid) {
      console.log('invalid');
      this.mockApiForm.markAllAsTouched();
      return;
    }

    this.save();
  }

}

interface MockApiFormModel {
  method: FormControl<string>;
  path: FormControl<string>;
  description: FormControl<string>;
  statusCode: FormControl<number>;
  responseContentType: FormControl<string>;
  body: FormControl<string>;
}