import { Pipe, PipeTransform } from '@angular/core'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { CssVariables } from '../appgrid-generator.interface'

@Pipe({
    name: 'appGridCss',
})
export class AppGridCssPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}

    transform(css: CssVariables | undefined | null): SafeHtml | undefined {
        const openCurly = '{'
        const closeCurly = '}'

        if (!css) {
            return undefined
        }

        const { gridGap, gridTemplateColumns, gridTemplateRows, gridAutoFlow, gridAutoRows } = css
        const cssStyles = `
            <p>${openCurly}</p>
            <p>&nbsp;&nbsp;height: ${css.containerHeight};</p>
            <p>&nbsp;&nbsp;display: grid;</p>
            <p>&nbsp;&nbsp;gap: ${gridGap};</p>
            <p>
                &nbsp;&nbsp;grid-template-columns:
                ${gridTemplateColumns};
            </p>
            <p>&nbsp;&nbsp;grid-template-rows: ${gridTemplateRows};</p>
            <p>&nbsp;&nbsp;grid-auto-flow: ${gridAutoFlow};</p>
            <p>&nbsp;&nbsp;grid-auto-row: ${gridAutoRows};</p>
            <p>${closeCurly}</p>`
        return this.sanitizer.bypassSecurityTrustHtml(cssStyles)
    }
}
