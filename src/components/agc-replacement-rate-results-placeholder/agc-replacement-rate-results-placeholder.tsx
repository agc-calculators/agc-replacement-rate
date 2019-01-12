
import { Component } from '@stencil/core';


@Component({
    tag: 'agc-replacement-rate-results-placeholder'
})
export class AgcReplacementRateResultsPlaceholder {

    

    render() {
        const placeholder = () => <span><i class="mark"></i> <i class="mark"></i> <i class="mark"></i> <i class="mark"></i></span>

        return (
            <section>
                <ul class="agc-results-placeholder">
                    <li>
                        <h2 data-i18n="results.replacements-needed">Total Replacements Needed</h2>
                        {placeholder()}
                    </li>
                    <li>
                        <h2 data-i18n="results.average-cow-age">Average Cow Age</h2>
                        {placeholder()}
                    </li>                                    
                </ul>
            </section>
        );
    }
}