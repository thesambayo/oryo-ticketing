import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentage',
  standalone: true
})
export class PercentagePipe implements PipeTransform {

  transform(won: number, target: number): number {
		let percentageValue = 0;
		if (won > 0 && target > 0) {
      let percentage = (won / target) * 100;
       percentageValue = parseFloat(percentage.toFixed(5));
    }

		return percentageValue;
	}

}
