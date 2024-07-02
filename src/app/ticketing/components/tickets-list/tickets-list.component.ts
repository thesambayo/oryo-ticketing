import { DatePipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { lucideBell, lucideMoreHorizontal, lucideSearch } from '@ng-icons/lucide';
import { HlmAvatarComponent, HlmAvatarFallbackDirective, HlmAvatarImageDirective } from '@spartan-ng/ui-avatar-helm';
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmCaptionComponent, HlmTableComponent, HlmTdComponent, HlmThComponent, HlmTrowComponent } from '@spartan-ng/ui-table-helm';
import { TicketItem, TicketItemPriority, TicketItemStatus, getPriorityVariant, getStatusVariant } from '../../models/ticket-item';
import { TicketPriorityDisplayPipe } from '../../pipes/ticket-priority-display.pipe';
import { TicketStatusDisplayPipe } from '../../pipes/ticket-status-display.pipe';



@Component({
  selector: 'oryo-tickets-list',
  standalone: true,
  imports: [
    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
    HlmIconComponent,
    HlmInputDirective,
    HlmTableComponent,
    HlmTrowComponent,
    HlmThComponent,
    HlmTdComponent,
    HlmCaptionComponent,
    HlmBadgeDirective,
    DatePipe,
    NgClass,
    TicketPriorityDisplayPipe,
    TicketStatusDisplayPipe
  ],
  providers: [provideIcons({ lucideBell, lucideSearch, lucideMoreHorizontal })],
  templateUrl: './tickets-list.component.html',
  styleUrl: './tickets-list.component.css'
})
export class TicketsListComponent {
  getStatusVariant = getStatusVariant;
  getPriorityVariant = getPriorityVariant;

  protected _tickets: TicketItem[] = [
    {
      id: 'T001',
      customerName: 'John Doe',
      customerEmail: 'john.doe@example.com',
      companyName: 'ABC Company',
      subject: 'Issue with login',
      priority: TicketItemPriority.URGENT,
      status: TicketItemStatus.OPEN,
      description: 'I am unable to login to my account.',
      attachments: ['file1.pdf', 'file2.png'],
      dateCreated: '2022-01-01',
      dateResolved: ''
    },
    {
      id: 'T002',
      customerName: 'Jane Smith',
      customerEmail: 'jane.smith@example.com',
      companyName: 'XYZ Corporation',
      subject: 'Payment not processed',
      priority: TicketItemPriority.MEDIUM,
      status: TicketItemStatus.IN_PROGRESS,
      description: 'I made a payment but it has not been processed yet.',
      attachments: [],
      dateCreated: '2022-01-02',
      dateResolved: ''
    },
    {
      id: 'T003',
      customerName: 'Mike Johnson',
      customerEmail: 'mike.johnson@example.com',
      companyName: '123 Industries',
      subject: 'Product not delivered',
      priority: TicketItemPriority.LOW,
      status: TicketItemStatus.CANCELLED,
      description: 'I ordered a product but it has not been delivered yet.',
      attachments: ['file3.docx'],
      dateCreated: '2022-01-03',
      dateResolved: ''
    },
    {
      id: 'T004',
      customerName: 'Sarah Williams',
      customerEmail: 'sarah.williams@example.com',
      companyName: 'ABC Company',
      subject: 'Bug in the system',
      priority: TicketItemPriority.HIGH,
      status: TicketItemStatus.RESOLVED,
      description: 'I found a bug in the system.',
      attachments: [],
      dateCreated: '2022-01-04',
      dateResolved: '2022-01-05'
    },
    {
      id: 'T005',
      customerName: 'David Brown',
      customerEmail: 'david.brown@example.com',
      companyName: 'XYZ Corporation',
      subject: 'Feature request',
      priority: TicketItemPriority.MEDIUM,
      status: TicketItemStatus.CLOSED,
      description: 'I have a feature request for the application.',
      attachments: ['file4.jpg', 'file5.txt'],
      dateCreated: '2022-01-05',
      dateResolved: '2022-01-06'
    }
  ];
}
