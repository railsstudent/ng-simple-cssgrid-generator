import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { AbstractControl, FormGroup, FormGroupDirective } from '@angular/forms'
import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'
import { gapUnits, gridUnits } from '../types'

@Component({
  selector: 'app-grid-template-form',
  templateUrl: './appgrid-template-form.component.html',
  styleUrls: ['./appgrid-template-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppTemplateFormComponent implements OnInit {
  @Input()
  legend: string

  @Input()
  formGroupName: string

  units = gridUnits
  unitsWithoutFlex = gapUnits

  minUnits$: Observable<typeof gapUnits | typeof gridUnits>

  form: FormGroup

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit() {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup

    this.form.get('repeat').valueChanges.subscribe((repeat) => {
      if (repeat === 'false') {
        this.form.get('numOfTimes').setValue(1)
      }
    })

    this.minUnits$ = this.minmax.valueChanges.pipe(
      startWith('true'),
      map((value) => {
        if (value === 'true') {
          return this.unitsWithoutFlex
        } else {
          return this.units
        }
      }),
    )
  }

  get minmax() {
    return this.form.get('minmax') as AbstractControl
  }
}
