import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
export declare class AgcReplacementRate {
    socket: string;
    tract: string;
    mode: 'full' | 'step';
    currentStep: number;
    cache: {};
    submitted: boolean;
    results: {};
    agcCalculated: EventEmitter;
    agcStepChanged: EventEmitter;
    form: HTMLFormElement;
    render(): JSX.Element;
    showTab(n: any): void;
    reset(): void;
    validateForm(): boolean;
    nextPrev(n: any, e: any): boolean;
    showResults(): void;
    handleAction(e: CustomEvent): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
}
