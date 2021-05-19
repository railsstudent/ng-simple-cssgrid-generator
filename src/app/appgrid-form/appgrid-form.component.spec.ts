import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppgridFormComponent } from './appgrid-form.component';

describe('AppgridFormComponent', () => {
    let component: AppgridFormComponent;
    let fixture: ComponentFixture<AppgridFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppgridFormComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppgridFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
