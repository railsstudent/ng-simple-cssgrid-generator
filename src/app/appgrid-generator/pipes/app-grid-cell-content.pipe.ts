import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'appGridCellContent',
})
export class AppGridCellContentPipe implements PipeTransform {
    transform(value: number, numOfTemplateCells: number): string {
        return value < numOfTemplateCells ? `${value}` : `${value} is an implicit grid cell`
    }
}
