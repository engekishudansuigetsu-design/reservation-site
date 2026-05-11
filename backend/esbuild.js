require("esbuild")
  .build({
    entryPoints: ["src/index.ts"],
    bundle: true,
    outfile: "dist/index.js",

    format: "iife",
    platform: "browser",
    target: "es2019",

    bundle: true,
    sourcemap: false,

    logLevel: "info",
  })
  .catch(() => process.exit(1));
