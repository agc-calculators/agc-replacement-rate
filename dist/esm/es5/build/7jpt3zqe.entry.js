/*! Built with http://stenciljs.com */
import{h}from"../agc-replacement-rate.core.js";var validate=function(e,t){var a=e.querySelector('[name="'+t+'"]'),i=e.querySelector('[data-validates="'+t+'"');return a.checkValidity()?(a.className=a.className.replace(" invalid",""),i.style.display="none",!0):(-1===a.className.indexOf("invalid")&&(a.className+=" invalid"),i.style.display="block",!1)},round=function(e,t){return+(Math.round(new Number(e+"e+"+t).valueOf())+"e-"+t)},AgcReplacementRate=function(){function e(){this.socket="",this.tract="",this.mode="step",this.currentStep=0,this.cache={},this.submitted=!1,this.results={}}return e.prototype.render=function(){var e=this;return h("div",null,h("form",{onSubmit:function(e){return e.preventDefault()},ref:function(t){return e.form=t},"data-wizard":"agc-replacement-rate","data-wizard-mode":this.mode,class:"agc-wizard"},h("slot",null),h("section",{"data-wizard-section":"1"},h("div",{class:"agc-wizard__field"},h("label",{"data-i18n":"fields.herd-size"},"Herd Size"),h("input",{name:"herdSize",type:"number",required:!0,min:"1"}),h("p",{class:"agc-wizard__validation-message","data-i18n":"validation.herd-size.required","data-validates":"herdSize"},"Please enter a whole number."),h("p",{"data-i18n":"hints.herd-size"},"⮤ Enter the size of the herd.")),h("div",{class:"agc-wizard__actions"},"step"===this.mode&&h("button",{class:"agc-wizard__actions-next","data-i18n":"actions.next",onClick:this.nextPrev.bind(this,1)},"Next"))),h("section",{"data-wizard-section":"2"},h("div",{class:"agc-wizard__field"},h("label",{"data-i18n":"fields.replacement-rate"},"Replacement Rate"),h("input",{name:"replacementRate",type:"number",required:!0}),h("p",{class:"agc-wizard__validation-message","data-i18n":"validation.replacement-rate.required","data-validates":"replacementRate"},"Please enter a value."),h("p",{"data-i18n":"hints.replacement-rate"},"⮤ Enter the desired replacement rate.")),h("div",{class:"agc-wizard__actions"},"step"===this.mode&&h("button",{class:"agc-wizard__actions-prev","data-i18n":"actions.prev",onClick:this.nextPrev.bind(this,-1)},"Back"),h("button",{class:"agc-wizard__actions-next","data-i18n":"actions.finish",onClick:this.nextPrev.bind(this,"step"===this.mode?1:2)},"Calculate"))),h("section",{"data-wizard-results":!0},h("slot",{name:"results"}))))},e.prototype.showTab=function(e){"step"===this.mode&&(this.cache.sections[e].style.display="block"),this.socket&&this.agcStepChanged.emit({socket:this.socket,tract:this.tract,step:this.currentStep})},e.prototype.reset=function(){this.currentStep=0,this.submitted=!1,this.showTab(0)},e.prototype.validateForm=function(){var e=!0;return 0!==this.currentStep&&"full"!==this.mode||validate(this.form,"herdSize")||(e=!1),1!==this.currentStep&&"full"!==this.mode||validate(this.form,"replacementRate")||(e=!1),e},e.prototype.nextPrev=function(e,t){if(t&&t.preventDefault(),"full"===this.mode){if(!this.validateForm())return!1}else if(1==e&&!this.validateForm())return!1;if("step"===this.mode&&(this.cache.sections[this.currentStep].style.display="none"),this.currentStep=this.currentStep+e,this.currentStep>=this.cache.sections.length)return this.submitted=!0,this.showResults.call(this),!1;this.showTab.call(this,this.currentStep)},e.prototype.showResults=function(){var e={2:.85,3:.9,4:.95,5:.95,6:.95,7:.95,8:.95,9:.9,10:.9,11:.9},t=parseInt(this.form.querySelector('[name="herdSize"').value),a=round(parseFloat(this.form.querySelector('[name="replacementRate"').value)/100,2),i=0,r=0;Object.keys(e).forEach(function(t){var s=parseFloat(e[t]);0===i?i=(r=s*a)*parseInt(t):i+=(r*=s)*parseInt(t)});var s=round(Math.ceil(a*t),0),n={socket:this.socket,tract:this.tract,herdSize:t,replacementRate:a,averageCowAge:round(i,1),replacementsNeeded:s,calculated:new Date};this.socket&&this.agcCalculated.emit({socket:this.socket,tract:this.tract,results:Object.assign({},n)}),this.results=Object.assign({},n),this.cache.results.forEach(function(e){e.style.display="block"})},e.prototype.handleAction=function(e){"reset"===e.detail.action&&this.reset()},e.prototype.componentDidLoad=function(){var e=Array.from(this.form.querySelectorAll("[data-wizard-section]")).map(function(e){return e}).map(function(e){return e}),t=Array.from(this.form.querySelectorAll("[data-wizard-results]")).map(function(e){return e}).map(function(e){return e});this.cache=Object.assign({},this.cache,{sections:e,results:t}),window.document.addEventListener("agcAction",this.handleAction.bind(this)),this.form.querySelector('[name="replacementRate"]').defaultValue="16.88",this.showTab(0)},e.prototype.componentDidUnload=function(){window.document.removeEventListener("agcAction",this.handleAction)},Object.defineProperty(e,"is",{get:function(){return"agc-replacement-rate"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{cache:{state:!0},currentStep:{state:!0},mode:{type:String,attr:"mode"},results:{state:!0},socket:{type:String,attr:"socket"},submitted:{state:!0},tract:{type:String,attr:"tract"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"events",{get:function(){return[{name:"agcCalculated",method:"agcCalculated",bubbles:!0,cancelable:!0,composed:!0},{name:"agcStepChanged",method:"agcStepChanged",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),e}();export{AgcReplacementRate};