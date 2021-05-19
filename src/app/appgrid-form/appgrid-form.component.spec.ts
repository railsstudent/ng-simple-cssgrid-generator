import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroupDirective, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ShareModule } from '../share.module';

import { AppgridFormComponent } from './appgrid-form.component';

describe('AppgridFormComponent', () => {
    let component: AppgridFormComponent;
    let fixture: ComponentFixture<AppgridFormComponent>;

    beforeEach(async () => {
        const fb = new FormBuilder();

        await TestBed.configureTestingModule({
            declarations: [AppgridFormComponent],
            imports: [ReactiveFormsModule, ShareModule, NoopAnimationsModule],
            providers: [
                {
                    provide: FormGroupDirective,
                    useValue: {
                        control: new FormGroup({
                            grid: fb.group({
                                heightInPixel: [60],
                                numDivs: [4],
                                gridAutoFlow: ['row'],
                                gap: [0],
                                gapUnit: ['px'],
                            }),
                        }),
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppgridFormComponent);
        component = fixture.componentInstance;
        component.formGroupName = 'grid';
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
