import {ComponentFixture} from '@angular/core/testing';

export class BaseSpecPage<T> {

  constructor(protected fixture: ComponentFixture<T>) {
  }

  public getElement(selector: string): any {
    return this.fixture.debugElement.nativeElement.querySelector(selector);
  }

  public getText(selector: string): string {
    return this.getElement(selector).innerText;
  }

  public click(selector: string): void {
    this.getElement(selector).click();
  }

  public isElementDisabled(selector: string): boolean {
    return this.getElement(selector).disabled;
  }

  public isElementAvailable(selector: string): boolean {
    return this.getElement(selector);
  }

  public getValue(selector: string): string {
    return this.getElement(selector).value;
  }

  public setValue(htmlInputElement: { value: string, dispatchEvent: (event: Event) => {} } | string, text: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        if (typeof htmlInputElement === 'string') {
          htmlInputElement = this.setTextFieldValue(htmlInputElement);
        }
        htmlInputElement.value = text;
        htmlInputElement.dispatchEvent(new Event('input'));
        return resolve();
      } catch (error) {
        return reject(error);
      }
    });
  }

  private setTextFieldValue(selector: string): { value: string, dispatchEvent: (event: Event) => {} } {
    return this.getElement(selector);
  }

  public detectChanges() {
    this.fixture.detectChanges();
    this.fixture.autoDetectChanges();
  }

  public whenStable(): Promise<any> {
    return this.fixture.whenStable();
  }
}
