import { AttributePart } from 'lit-html-optimised';
export default function getActionsCollector(actionsByInstance: any): {
    new (instance: any): {
        instance: string;
        actions: unknown[];
        props: unknown;
        set(actions: unknown[], props: object): any;
        body(part: AttributePart): void;
        isDirective: boolean;
        isClass: boolean;
    };
};
