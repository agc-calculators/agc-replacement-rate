/*! Built with http://stenciljs.com */
import { h } from '../agc-replacement-rate.core.js';

class AgcReplacementRateResults {
    constructor() {
        this.socket = "";
        this.ready = false;
    }
    render() {
        return (h("section", { "data-wizard-results": true, ref: c => this.section = c },
            h("div", { style: { display: this.ready ? 'none' : 'block' } },
                h("slot", { name: "empty" })),
            h("div", { style: { display: this.ready ? 'block' : 'none' } }, this.data && (h("ul", { class: "agc-results" },
                h("li", null,
                    h("h2", { "data-i18n": "results.replacements-needed" }, "Total Replacements Needed"),
                    h("span", { class: "agc-results__value" }, this.data['replacementsNeeded']),
                    h("sub", null, "hd")),
                h("li", null,
                    h("h2", { "data-i18n": "results.average-cow-age" }, "Average Cow Age"),
                    h("span", { class: "agc-results__value" }, this.data['averageCowAge']),
                    h("sub", { "data-i18n": "results.years" }, "years")))))));
    }
    handleResults(e) {
        if (e.detail['socket'] !== this.socket) {
            return;
        }
        this.data = Object.assign({}, e.detail['results']);
        this.ready = true;
    }
    componentDidLoad() {
        if (!this.socket) {
            return;
        }
        window.document.addEventListener('agcCalculated', this.handleResults.bind(this));
    }
    componentDidUnload() {
        window.document.removeEventListener('agcCalculated', this.handleResults);
    }
    static get is() { return "agc-replacement-rate-results"; }
    static get properties() { return {
        "data": {
            "state": true
        },
        "ready": {
            "state": true
        },
        "socket": {
            "type": String,
            "attr": "socket"
        }
    }; }
}

export { AgcReplacementRateResults };
