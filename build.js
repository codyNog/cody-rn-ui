import { chmod, rename } from "node:fs/promises";
import * as esbuild from "esbuild";

async function build() {
  try {
    // esbuildでビルド
    await esbuild.build({
      entryPoints: ["cli.ts"],
      bundle: true,
      platform: "node",
      target: "node16",
      format: "cjs",
      outdir: "dist",
      banner: {
        js: "#!/usr/bin/env node",
      },
    });

    // ファイル名変更
    await rename("dist/cli.js", "dist/index.js");

    // 実行権限付与
    await chmod("dist/index.js", 0o755);

    console.log("Build completed successfully!");
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
}

build();
