import { AnyVido } from './vido';
export default function getPublicComponentMethods(components: Map<string, any>, actionsByInstance: Map<string, any>, clone: (obj: object) => object): {
    new (instance: string, vidoInstance: AnyVido, props?: unknown): {
        instance: string;
        name: string;
        vidoInstance: any;
        props: any;
        destroyed: boolean;
        /**
         * Destroy component
         */
        destroy(): void;
        /**
         * Update template - trigger rendering process
         */
        update(callback?: (() => void) | undefined): any;
        /**
         * Change component input properties
         * @param {any} newProps
         */
        change(newProps: unknown, options?: unknown): void;
        /**
         * Get component lit-html template
         * @param {} templateProps
         */
        html(templateProps?: unknown): any;
        _getComponents(): Map<string, any>;
        _getActions(): Map<string, any>;
    };
};
//# sourceMappingURL=PublicComponentMethods.d.ts.map