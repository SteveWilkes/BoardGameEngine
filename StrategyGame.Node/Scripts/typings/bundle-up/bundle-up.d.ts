declare module "bundle-up" {
    import express = require("express");

    function b(app: express.Express, pathToAssets: string, options: b.IBundleUpOptions): void;

    module b {
        interface IBundleUpOptions {
            staticRoot: string;
            staticUrlRoot: string;
            bundle: boolean;
            minifyCss: boolean;
            minifyJs: boolean;
        }

        interface IBundleUpAssets {
            root: string;
            addCss(path: string, namespace?: string): void;
            addJs(path: string, namespace?: string): void;
        }
    }

    export = b;
}