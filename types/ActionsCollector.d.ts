import { AttributePart } from 'lit-html/directive.js';
export interface IAction {
    instance: string;
    componentAction: {
        create: any;
        update: (el: any, props: any) => void;
        destroy: (el: any, props: any) => void;
    };
    element: any;
    props: object;
    isActive?: () => boolean;
    created: boolean;
}
export default function getActionsCollector(actionsByInstance: Map<string, IAction[]>): {
    new (_partInfo: import("lit-html/directive.js").PartInfo): {
        update(part: AttributePart, props: unknown[]): void;
        render(instance: string, actions: IAction[], props: object): symbol;
        get _$isConnected(): boolean;
    };
};
//# sourceMappingURL=ActionsCollector.d.ts.map