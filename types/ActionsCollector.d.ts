import { AttributePart } from 'lit-html/directive';
export default function getActionsCollector(actionsByInstance: Map<string, any>): {
    new (_partInfo: import("lit-html/directive").PartInfo): {
        update(part: AttributePart, props: unknown[]): void;
        render(instance: string, actions: any[], props: object): symbol;
        readonly _$isConnected: boolean;
    };
};
