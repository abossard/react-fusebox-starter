import { src, task, exec, context } from "fuse-box/sparky"
import { FuseBox, QuantumPlugin } from "fuse-box";

context({

  baseConfigureServerBundle: (fuse: FuseBox) => 
    fuse.bundle("server")
      .target("server@es2017")
      .instructions("> [server/server.ts]")
  ,
  baseConfigureClientBundle: (fuse: FuseBox) =>
    fuse
      .bundle("htdocs/index.bundle")
      .target("browser@es6")
      .instructions(" > app/index.tsx")
  ,
  getConfig: function getConfig(isProduction = false) {
    return FuseBox.init({
      homeDir: "src",
      output: "dist/$name.js",
      useTypescriptCompiler: true,
      sourceMaps: true,
      plugins: [
        isProduction &&
        QuantumPlugin({
          uglify: false,
          treeshake: true,
        }),
      ],
    });
  }
});

task("default", async context => {

  const fuse = context.getConfig();
  fuse.dev({
    httpServer: false
  });

  context.baseConfigureServerBundle(fuse)
    .watch("server/**")
    .completed((proc) => {
      proc.require({
        close: ({ FuseBox }) => {
          console.log("Close: ", FuseBox.import(FuseBox.mainFile))
        }
      });
    })

  context.baseConfigureClientBundle(fuse)
    .hmr()
    .watch("app/**");

  await fuse.run();
});


task("dist", async context => {
  const fuseApp = context.getConfig(true);
  context.baseConfigureClientBundle(fuseApp)
  await fuseApp.run();
  const fuseServer = context.getConfig(false);
  context.baseConfigureServerBundle(fuseServer)
  await fuseServer.run();
});