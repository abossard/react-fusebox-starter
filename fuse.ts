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




/*
class Context {
  createClientFuse = (isDevelopment=true) => fusebox({
    target: "browser",
    entry: "src/app/index.tsx",
    devServer: {
      enabled: isDevelopment,
      httpServer: false,
    }
  });
  createServerFuse = (isDevelopment=true) => fusebox({
    target: "server",
    entry: "src/server/server.ts",
    devServer: false
  });
}

const { task } = sparky<Context>(Context);

task("default", async context => {
  console.log('In Default');
  const result = await context.createServerFuse().runDev();
  console.log('have result', result);
  result.onComplete((opts)=> {
    console.log("On Complete")
    opts.server.start()

  })
  await Promise.all([

    context.createClientFuse().runDev()
  ]);
});

task("preview", async context => {
  await context.createClientFuse().runProd({ uglify: false });
});
task("production", async context => {
  await context.createClientFuse().runProd({ uglify: true });
});
/*
*/
