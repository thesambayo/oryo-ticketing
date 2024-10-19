import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'leftPadding',
	standalone: true
})
export class LeftPaddingPipe implements PipeTransform {
	transform(value: string | number, length: number, padCharacter: string = '0'): string {
		let processedValue = typeof value === 'number' ? String(value) : value;
		if (processedValue.length >= length) {
			return processedValue;
		}

		while (processedValue.length < length) {
			processedValue = padCharacter + processedValue;
		}

		return processedValue;
	}

}
