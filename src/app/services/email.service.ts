import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

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
  constructor() { }

  sendEmail(emailFields: EmailFields) {
    const data = {
      service_id: 'service_uvhcsmo',
      template_id: 'template_u4rjzet',
      user_id: 'ODUehXBQt0jEW90d4',
      template_params: {
        from_name: emailFields.name,
        company: emailFields.company,
        decription: emailFields.description,
        reply_to: "samuel.adebayo@oryoltd.com",
        from_email: emailFields.email,
        issue_type: emailFields.issueType,
      }
    };

    return this.http.post('https://api.emailjs.com/api/v1.0/email/send', data);
  }
}
