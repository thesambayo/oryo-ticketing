import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NocClientReportListComponent } from "./noc-client-report-list.component";

describe("NocDashboardComponent", () => {
	let component: NocClientReportListComponent;
	let fixture: ComponentFixture<NocClientReportListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [NocClientReportListComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(NocClientReportListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
