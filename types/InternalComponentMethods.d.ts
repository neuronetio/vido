import { AnyVido, htmlResult } from './vido';
export default function getInternalComponentMethods(components: Map<string, any>, actionsByInstance: Map<string, any>, clone: (obj: object) => object): {
    new (instance: string, vidoInstance: AnyVido, renderFunction: (arg: any) => htmlResult): {
        instance: string;
        vidoInstance: any;
        renderFunction: (changedProps: any) => void;
        content: any;
        destroyed: boolean;
        destroy(): void;
        update(props?: {}): void;
        change(changedProps: unknown, options?: {
            leave: boolean;
        }): void;
    };
};
//# sourceMappingURL=InternalComponentMethods.d.ts.map