import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { nanoid } from 'nanoid';

export interface EmailFields {
  name: string;
  email: string;
  company: string;
  issueType: string;
  description: string;

}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  http = inject(HttpClient);

  sendEmail(emailFields: EmailFields) {
    const ticketId = nanoid(10);
    this.sendEmailToSupport(emailFields, ticketId).subscribe();
    return this.sendEmailToReporter(emailFields, ticketId);
  }

  sendEmailToSupport(emailFields: EmailFields, ticketId: string) {
    const data = {
      service_id: 'service_uvhcsmo',
      template_id: 'template_ocvvsec', // replace with email to support template
      user_id: 'ODUehXBQt0jEW90d4',
      template_params: {
        ticket_id: ticketId,
        reporter_name: emailFields.name,
        reporter_email: emailFields.email,

        issue_type: emailFields.issueType,
        description: emailFields.description,
        reporter_company: emailFields.company,
      }
    };

    return this.http.post('https://api.emailjs.com/api/v1.0/email/send', data);
  }

  sendEmailToReporter(emailFields: EmailFields, ticketId: string) {
    const data = {
      service_id: 'service_uvhcsmo',
      template_id: 'template_u4rjzet',
      user_id: 'ODUehXBQt0jEW90d4',
      template_params: {
        ticket_id: ticketId,
        reporter_name: emailFields.name,
        reporter_email: emailFields.email,
      }
    };

    return this.http.post('https://api.emailjs.com/api/v1.0/email/send', data);
  }
}
