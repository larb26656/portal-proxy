import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CodeModel } from '@ngstack/code-editor';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'code-input',
  templateUrl: './code-input.component.html',
  styleUrls: ['./code-input.component.scss'], 
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CodeInputComponent),
      multi: true
    }
  ]
})
export class CodeInputComponent implements ControlValueAccessor {

  theme = 'vs-dark';

  options = {
    contextmenu: true,
  };

  codeModel: CodeModel;

  onChange: any = () => {};
  onTouched: any = () => {};

  isDisabled: boolean = false;

  constructor() {
    const uri = this.generateUniqueId();

    this.codeModel = {
      language: 'json',
      uri: uri,
      value: '{}'
    }
  }

  generateUniqueId(): string {
    return uuidv4();
  }

  setValue(value: string) {
    const newIntance = JSON.parse(JSON.stringify(this.codeModel));

    newIntance.value = value;

    this.codeModel = newIntance;
  }

  onValueChanged(value: string) {
    this.onChange(value);
  }

  writeValue(value: string): void {
    this.setValue(value);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnInit() {
  }

}
