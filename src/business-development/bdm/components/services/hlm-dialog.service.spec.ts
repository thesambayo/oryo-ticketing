import { TestBed } from '@angular/core/testing';

import { HlmDialogService } from './hlm-dialog.service';

describe('HlmDialogService', () => {
  let service: HlmDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HlmDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
