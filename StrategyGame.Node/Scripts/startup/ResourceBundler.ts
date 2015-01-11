import bundleUp = require("bundle-up");
import bs = require("Bootstrap");

class ResourceBundler implements bs.IBootstrapper {
    public setup(info: bs.SystemInfo): void {
        bundleUp(info.app, info.assetsRoot, {
            staticRoot: info.publicRoot,
            staticUrlRoot: "/",
            bundle: info.isReleaseMode,
            minifyCss: info.isReleaseMode,
            minifyJs: info.isReleaseMode
        });
    }
}

var factory = () => { return new ResourceBundler(); };

export = factory;