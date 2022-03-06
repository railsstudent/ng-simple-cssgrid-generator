import { TestBed, waitForAsync } from '@angular/core/testing'
import { FormGroupDirective, ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { AppComponent } from './app.component'
import { AppTemplateFormComponent } from './appgrid-template-form'
import { AppGridGeneratorComponent } from './appgrid-generator/appgrid-generator.component'
import { ShareModule } from './share.module'
import { AppgridFormComponent } from './appgrid-form'

describe('AppComponent', () => {
    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [AppComponent, AppGridGeneratorComponent, AppTemplateFormComponent, AppgridFormComponent],
                imports: [ReactiveFormsModule, ShareModule, NoopAnimationsModule],
                providers: [FormGroupDirective],
            }).compileComponents()
        }),
    )

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent)
        const app = fixture.debugElement.componentInstance
        expect(app).toBeTruthy()
    })

    it(`should have as title 'Simple CSS Grid Generator'`, () => {
        const fixture = TestBed.createComponent(AppComponent)
        const app = fixture.debugElement.componentInstance
        expect(app.title).toEqual('Simple CSS Grid Generator')
    })

    it('should render title in a h1 tag', () => {
        const fixture = TestBed.createComponent(AppComponent)
        fixture.detectChanges()
        const compiled = fixture.debugElement.nativeElement
        expect(compiled.querySelector('h1').textContent).toContain('Simple CSS Grid Generator')
    })
})
