import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'removeUnderscore',
	standalone: true
})
export class RemoveUnderscorePipe implements PipeTransform {
	// transform(value: string, _itemToRemove = "_"): string {
	transform(value: string): string {
		return value.replace(/_/g, " ");
	}

}
