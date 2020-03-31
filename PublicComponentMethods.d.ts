export default function getPublicComponentMethods(components: any, actionsByInstance: any, clone: any): {
    new (instance: any, vidoInstance: any, props?: {}): {
        instance: string;
        name: string;
        vidoInstance: any;
        props: any;
        /**
         * Destroy component
         */
        destroy(): any;
        /**
         * Update template - trigger rendering process
         */
        update(): any;
        /**
         * Change component input properties
         * @param {any} newProps
         */
        change(newProps: any, options: any): void;
        /**
         * Get component lit-html template
         * @param {} templateProps
         */
        html(templateProps?: {}): any;
        _getComponents(): any;
        _getActions(): any;
    };
};
