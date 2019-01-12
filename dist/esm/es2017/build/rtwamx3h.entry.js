/*! Built with http://stenciljs.com */
import { h } from '../agc-replacement-rate.core.js';

class AgcReplacementRateResultsPlaceholder {
    render() {
        const placeholder = () => h("span", null,
            h("i", { class: "mark" }),
            " ",
            h("i", { class: "mark" }),
            " ",
            h("i", { class: "mark" }),
            " ",
            h("i", { class: "mark" }));
        return (h("section", null,
            h("ul", { class: "agc-results-placeholder" },
                h("li", null,
                    h("h2", { "data-i18n": "results.replacements-needed" }, "Total Replacements Needed"),
                    placeholder()),
                h("li", null,
                    h("h2", { "data-i18n": "results.average-cow-age" }, "Average Cow Age"),
                    placeholder()))));
    }
    static get is() { return "agc-replacement-rate-results-placeholder"; }
}

export { AgcReplacementRateResultsPlaceholder };
