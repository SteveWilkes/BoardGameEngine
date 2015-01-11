declare module "stylus" {
    // Merged declaration, e is both a callable function and a namespace
    function s(stylusData?: NodeBuffer): s.Stylus;

    module s {
        interface Stylus {
            middleware(dir: string): any;

            render(callback: (stylusErr: Error, css: string) => void): void;
        }
    }

    export = s;
}