import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CodeModel } from '@ngstack/code-editor';
import { MockApiDto, createDefaultMockApiDto } from '../../../model/dto/mock-api.dto';
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
  @Input() data: MockApiDto = createDefaultMockApiDto();

  methods: string[] = [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE'
  ] 

  responseContentTypes: string[] = ['application/json'];

  readonly mockApiForm: FormGroup<MockApiFormModel>

  constructor(
    private readonly fb: FormBuilder, 
    private readonly notificationService: NotificationService,
    private readonly mockApiService: MockApiService,
    private readonly mainPageComponent: MainPageComponent
    ) {
    this.mockApiForm = fb.group<MockApiFormModel>({
      request: fb.group<MockApiRequestFormModel>({
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
        isStrictContentType: fb.control<boolean>(false, {
          validators: [Validators.required],
          nonNullable: true,
        }),
        contentType: fb.control<string>('', {
          validators: [],
          nonNullable: true,
        }),
        isStrictBody: fb.control<boolean>(false, {
          validators: [Validators.required],
          nonNullable: true,
        }),
        body: fb.control<string>('', {
          validators: [],
          nonNullable: true,
        }),
      }),
      response: fb.group<MockApiResponseFormModel>({
        delayInSec: fb.control<number>(0, {
          validators: [Validators.required],
          nonNullable: true,
        }),
        statusCode: fb.control<number>(0, {
          validators: [Validators.required],
          nonNullable: true,
        }),
        contentType: fb.control<string>('', {
          validators: [Validators.required],
          nonNullable: true,  
        }),
        body: fb.control<string>('', {
          validators: [],
          nonNullable: true,
        }),
      })
    });

    const requestControls = this.mockApiForm.controls.request.controls;

    requestControls.isStrictContentType.valueChanges.subscribe((value) => {
      if (value) {
        requestControls.contentType.enable();
      } else {
        requestControls.contentType.disable();
      }      
    });

    requestControls.isStrictBody.valueChanges.subscribe((value) => {
      if (value) {
        requestControls.body.enable();
      } else {
        requestControls.body.disable();
      }      
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

    const request = this.data.request;
    const response = this.data.response;

    this.mockApiForm.patchValue({
      request: {
        method: request.method ?? '',
        path: request.path ?? '',
        description: request.description ?? '',
        isStrictContentType: request.isStrictContentType ?? false,
        contentType: request.contentType ?? '',
        isStrictBody: request.isStrictBody ?? false,
        body: request.body ?? ''
      },
      response: {
        delayInSec: response.delayInSec ?? 0,
        statusCode: response.statusCode ?? 0,
        contentType: response.contentType ?? '',
        body: response.body ?? '',
      }
    });
  }

  onClose() {
    this.mainPageComponent.mockApiData = undefined;
  }

  save() {
    this.notificationService.startSpinner();
    
    let saveObs$;

    const requestControls = this.mockApiForm.controls.request.controls;
    const responseControls = this.mockApiForm.controls.response.controls;

    const formValue = {
      id: this.data.id,
      request: {
        method: requestControls.method.value,
        path: requestControls.path.value,
        description: requestControls.description.value,
        isStrictContentType: requestControls.isStrictContentType.value,
        contentType: requestControls.contentType.value,
        isStrictBody: requestControls.isStrictBody.value,
        body: requestControls.body.value
      },
      
      response: {
        delayInSec: responseControls.delayInSec.value,
        statusCode: responseControls.statusCode.value,
        contentType: responseControls.contentType.value,
        body: responseControls.body.value
      }
    } as MockApiDto;

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
    if (this.mockApiForm.invalid) {
      this.mockApiForm.markAllAsTouched();
      return;
    }

    this.save();
  }

}

interface MockApiRequestFormModel {
  method: FormControl<string>;
  path: FormControl<string>;
  description: FormControl<string>;
  isStrictContentType: FormControl<boolean>;
  contentType: FormControl<string>;
  isStrictBody: FormControl<boolean>;
  body: FormControl<string>;
}

interface MockApiResponseFormModel {
  delayInSec: FormControl<number>;
  statusCode: FormControl<number>;
  contentType: FormControl<string>;
  body: FormControl<string>;
}

interface MockApiFormModel {
  request: FormGroup<MockApiRequestFormModel>;
  response: FormGroup<MockApiResponseFormModel>;
}