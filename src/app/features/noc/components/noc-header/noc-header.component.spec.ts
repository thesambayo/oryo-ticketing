import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NocHeaderComponent } from "./noc-header.component";

describe("NocHeaderComponent", () => {
	let component: NocHeaderComponent;
	let fixture: ComponentFixture<NocHeaderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [NocHeaderComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(NocHeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
