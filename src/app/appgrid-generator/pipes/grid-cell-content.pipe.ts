import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'gridCellContent',
})
export class GridCellContentPipe implements PipeTransform {
    transform(value: number, numOfTemplateCells: number): string {
        return value < numOfTemplateCells ? `${value}` : `${value} is an implicit grid cell`
    }
}
