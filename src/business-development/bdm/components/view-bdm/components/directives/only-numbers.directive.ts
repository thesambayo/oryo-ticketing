import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]',
  standalone: true,
  exportAs: 'appOnlyNumbers'
})
export class OnlyNumbersDirective {
  private el: HTMLInputElement;

  constructor(private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
  }

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    this.el.value = this.formatToCommaNumbers(this.el.value);
  }

  @HostListener('blur', ['$event'])
  onBlur(event: Event): void {
    this.formatOnKeyUp();
  }

  public formatOnKeyUp(): void {
    this.el.value = this.formatNumber(this.el.value);
  }

  private formatNumber(value: string): string {
    // Remove non-numeric characters except for decimal points
    const cleanedValue = value.replace(/[^0-9.]/g, '');
    const number = parseFloat(cleanedValue);
    if (isNaN(number)) {
      return '';
    }
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formatter.format(number);
  }

  private formatToCommaNumbers(value: string): string {
    // Remove non-numeric characters except for decimal points
    const cleanedValue = value.replace(/[^0-9.]/g, '');

    // Split the value into integer and decimal parts
    const parts = cleanedValue.split('.');
    // Add commas to the integer part
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // Join the integer and decimal parts
    return parts.join('.');
  }
}
