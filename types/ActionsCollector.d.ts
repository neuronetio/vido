import { AttributePart } from 'lit-html/directive.js';
export default function getActionsCollector(actionsByInstance: Map<string, any>): {
    new (_partInfo: import("lit-html/directive.js").PartInfo): {
        update(part: AttributePart, props: unknown[]): void;
        render(instance: string, actions: any[], props: object): symbol;
        readonly _$isConnected: boolean;
    };
};
