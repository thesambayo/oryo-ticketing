import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NocClientsComponent } from "./noc-clients.component";

describe("NocClientsComponent", () => {
	let component: NocClientsComponent;
	let fixture: ComponentFixture<NocClientsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [NocClientsComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(NocClientsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
