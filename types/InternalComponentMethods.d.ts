export default function getInternalComponentMethods(components: any, actionsByInstance: any, clone: any): {
    new (instance: string, vidoInstance: any, renderFunction: any, content: any): {
        instance: string;
        vidoInstance: any;
        renderFunction: (changedProps: any) => void;
        content: any;
        destroy(): void;
        update(props?: {}): void;
        change(changedProps: any, options?: {
            leave: boolean;
        }): void;
    };
};
//# sourceMappingURL=InternalComponentMethods.d.ts.map