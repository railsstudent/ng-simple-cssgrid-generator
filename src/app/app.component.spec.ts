import { async, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppGeneratorFormComponent } from './appgrid-generator-form/appgrid-generator-form.component';
import { AppGridGeneratorComponent } from './appgrid-generator/appgrid-generator.component';
import { ShareModule } from './share.module';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent, AppGridGeneratorComponent, AppGeneratorFormComponent],
            imports: [ReactiveFormsModule, ShareModule, NoopAnimationsModule],
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'Very Simple CSS Grid Generator'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('Very Simple CSS Grid Generator');
    });

    it('should render title in a h1 tag', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Very Simple CSS Grid Generator');
    });
});
