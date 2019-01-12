
import { Component, State, Event, EventEmitter, Prop } from '@stencil/core';
import { validate, round } from '../../utils'

@Component({
    tag: 'agc-replacement-rate'
})
export class AgcReplacementRate {

    @Prop() socket: string = ""
    @Prop() tract: string = ""
    @Prop() mode: 'full' | 'step' = 'step'
    @State() currentStep = 0
    @State() cache = {}
    @State() submitted = false
    @State() results = {}
    @Event({
        eventName: 'agcCalculated'
      }) agcCalculated: EventEmitter;
    @Event({
        eventName: 'agcStepChanged'
    }) agcStepChanged: EventEmitter;

    form: HTMLFormElement

    render() {
        return (
            <div>
                <form onSubmit={(e) => e.preventDefault()} ref={c => this.form = c as HTMLFormElement} data-wizard="agc-replacement-rate" 
                    data-wizard-mode={this.mode}
                    class="agc-wizard">
                    <slot></slot>
                    <section data-wizard-section="1">
                        <div class="agc-wizard__field">
                            <label data-i18n="fields.herd-size">Herd Size</label>
                            <input name="herdSize" type="number" required min="1" />
                            <p class="agc-wizard__validation-message" data-i18n="validation.herd-size.required" data-validates="herdSize">Please enter a whole number.</p>
                            <p data-i18n="hints.herd-size">⮤ Enter the size of the herd.</p>
                        </div>
                        <div class="agc-wizard__actions">
                            {this.mode === 'step' && <button class="agc-wizard__actions-next" data-i18n="actions.next" onClick={this.nextPrev.bind(this, 1)}>Next</button>}
                        </div>
                    </section>
                    <section data-wizard-section="2">
                        <div class="agc-wizard__field">
                            <label data-i18n="fields.replacement-rate">Replacement Rate</label>
                            <input name="replacementRate" type="number" required />
                            <p class="agc-wizard__validation-message" data-i18n="validation.replacement-rate.required" data-validates="replacementRate">Please enter a value.</p>
                            <p data-i18n="hints.replacement-rate">⮤ Enter the desired replacement rate.</p>
                        </div>
                        <div class="agc-wizard__actions">
                            {this.mode === 'step' && <button class="agc-wizard__actions-prev" data-i18n="actions.prev" onClick={this.nextPrev.bind(this, -1)}>Back</button>}
                            <button class="agc-wizard__actions-next" data-i18n="actions.finish" onClick={this.nextPrev.bind(this, this.mode === 'step' ? 1 : 2)}>Calculate</button>
                        </div>
                    </section>
                    <section data-wizard-results>                        
                        <slot name="results"></slot>                     
                    </section>
                </form>
            </div>
        );
    }

    showTab(n) {
        // This function will display the specified section of the form... 
        if (this.mode === 'step') {       
            this.cache['sections'][n].style.display = "block";
        }

        if (this.socket) {
            this.agcStepChanged.emit({socket: this.socket, tract: this.tract, step: this.currentStep})
        }
    }

    reset() {
        this.currentStep = 0
        this.submitted = false
        this.showTab(0)
    }

    validateForm () {
        let valid = true;

        if (this.currentStep === 0 || this.mode === 'full') {
            if (!validate(this.form, 'herdSize')) {
                valid = false
            }
        }

        if (this.currentStep === 1 || this.mode === 'full') {
            if (!validate(this.form, 'replacementRate')) {
                valid = false
            }
        }       


        return valid;
    }

    nextPrev(n, e) {
        e && e.preventDefault()
        if (this.mode === 'full') {
            if (!this.validateForm()) return false
        } else if (n == 1 && !this.validateForm()) return false

        // Hide the current tab:
        if (this.mode === 'step') {
            this.cache['sections'][this.currentStep].style.display = "none"
        }
        // Increase or decrease the current tab by 1:
        this.currentStep = this.currentStep + n
        // if you have reached the end of the form...
        if (this.currentStep >= this.cache['sections'].length) {
            // ... the form gets submitted:
            this.submitted = true
            this.showResults.call(this);
            return false;
        }
        // Otherwise, display the correct tab:
        this.showTab.call(this, this.currentStep);
    }

    showResults() {
        const pregRates = {
            2: .85,
            3: .90,
            4: .95,
            5: .95,
            6: .95,
            7: .95,
            8: .95,
            9: .90,
            10: .90,
            11: .90
        }

        let herdSize =  parseInt((this.form.querySelector('[name="herdSize"') as HTMLInputElement).value);        
        let replacementRate =  round(parseFloat((this.form.querySelector('[name="replacementRate"') as HTMLInputElement).value) / 100, 2);

        let averageCowAge = 0
        let lastSum = 0

        Object.keys(pregRates).forEach( key => {
            let rate = parseFloat(pregRates[key])
            if (averageCowAge === 0) {
                lastSum = ( rate * replacementRate )
                averageCowAge = lastSum * parseInt(key)
            } else {
                var tmpSum = lastSum;
                lastSum = tmpSum * rate
                averageCowAge += lastSum * parseInt(key)
            }
        })

        let replacementsNeeded = round(Math.ceil(replacementRate * herdSize), 0)
        
        let results = {
            socket: this.socket,
            tract: this.tract,
            herdSize,
            replacementRate,
            averageCowAge: round(averageCowAge, 1),
            replacementsNeeded,
            calculated: new Date()
        }

        if (this.socket) {
            this.agcCalculated.emit({socket: this.socket, tract: this.tract, results: {...results}})
        }

        this.results = {...results}
        
        this.cache['results'].forEach(result => {
            result.style.display = 'block'
        })
    }

    handleAction(e:CustomEvent) {
        if (e.detail['action'] === 'reset') {
            this.reset();
        }
    }

    componentDidLoad() {
        var sections = Array.from(this.form.querySelectorAll('[data-wizard-section]')).map(c => c as any).map(c => c as HTMLElement)
        var results = Array.from(this.form.querySelectorAll('[data-wizard-results]')).map(c => c as any).map(c => c as HTMLElement)
        this.cache = {...this.cache, sections: sections, results: results}

        window.document.addEventListener('agcAction', this.handleAction.bind(this));

        (this.form.querySelector('[name="replacementRate"]') as HTMLInputElement)!.defaultValue = '16.88';

        this.showTab(0)
    }

    componentDidUnload() {
        window.document.removeEventListener('agcAction', this.handleAction);
    }
}