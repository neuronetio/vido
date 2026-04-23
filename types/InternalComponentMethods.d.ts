import { IAction } from './ActionsCollector';
import { AnyVido, htmlResult } from './vido';
export interface IInternalComponentMethods {
    instance: string;
    vidoInstance: AnyVido;
    renderFunction: (changedProps: any) => void;
    content: any;
    destroyed: boolean;
    destroying: boolean;
    destroy(): void;
    update(props?: any): any;
    change(changedProps: unknown, options?: {
        leave: boolean;
    }): void;
}
export type IInternalComponentMethodsConstructor = new (instance: string, vidoInstance: AnyVido, renderFunction: (arg: any) => htmlResult) => IInternalComponentMethods;
export default function getInternalComponentMethods(components: Map<string, any>, actionsByInstance: Map<string, IAction[]>, clone: (obj: object) => object): IInternalComponentMethodsConstructor;
//# sourceMappingURL=InternalComponentMethods.d.ts.map