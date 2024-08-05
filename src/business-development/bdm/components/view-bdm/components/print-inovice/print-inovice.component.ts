import { Component, HostBinding, inject } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { HlmDialogService } from '../../../../../../libs/ui/ui-dialog-helm/src/lib/hlm-dialog.service';

@Component({
  selector: 'oryo-print-inovice',
  standalone: true,
  imports: [],
  templateUrl: './print-inovice.component.html',
  styleUrl: './print-inovice.component.css'
})
export class PrintInoviceComponent {
  @HostBinding('class') private readonly _class: string = 'w-full';

  downloadPDF() {
    const invoiceElement = document.getElementById('invoice');

    if (invoiceElement) {
      html2canvas(invoiceElement).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('invoice.pdf');
      });
    } else {
      console.error('Invoice element not found');
    }
  }
}
