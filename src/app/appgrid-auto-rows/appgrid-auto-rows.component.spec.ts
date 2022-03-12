import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AppgridAutoRowsComponent } from './appgrid-auto-rows.component'

describe('AppgridAutoRowsComponent', () => {
    let component: AppgridAutoRowsComponent
    let fixture: ComponentFixture<AppgridAutoRowsComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppgridAutoRowsComponent],
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(AppgridAutoRowsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
