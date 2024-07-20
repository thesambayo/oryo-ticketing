import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { nanoid } from 'nanoid';
import { TicketsService } from '../../help-desk/ticketing/services/tickets.service';

export interface EmailFields {
  name: string;
  email: string;
  company: string;
  issueType: string;
  description: string;
	ticketId: string
  // add more items to this interface as needed
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  _http = inject(HttpClient);
  _ticketsService = inject(TicketsService);



  public generateTicketId(): string {
    return nanoid(10);
  }

  public sendEmail(emailFields: EmailFields) {
    this.sendEmailToSupport(emailFields).subscribe();
    return this.sendEmailToReporter(emailFields);
  }

  private sendEmailToSupport(emailFields: EmailFields) {
    const data = {
      service_id: 'service_uvhcsmo',
      template_id: 'template_ocvvsec', // replace with email to support template
      user_id: 'ODUehXBQt0jEW90d4',
      template_params: {
        ticket_id: emailFields.ticketId,
        reporter_name: emailFields.name,
        reporter_email: emailFields.email,

        issue_type: emailFields.issueType,
        description: emailFields.description,
        reporter_company: emailFields.company,
      }
    };

    return this._http.post('https://api.emailjs.com/api/v1.0/email/send', data);
  }

  public sendEmailToReporter(emailFields: EmailFields) {
    const data = {
      service_id: 'service_uvhcsmo',
      template_id: 'template_u4rjzet',
      user_id: 'ODUehXBQt0jEW90d4',
      template_params: {
        ticket_id: emailFields.ticketId,
        reporter_name: emailFields.name,
        reporter_email: emailFields.email,
      }
    };

    return this._http.post('https://api.emailjs.com/api/v1.0/email/send', data);
  }
}
