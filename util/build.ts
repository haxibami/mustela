const banner = await Bun.file("src/banner.txt").text();
await Bun.build({
  entrypoints: ["src/index.ts"],
  format: "iife",
  minify: true,
  banner: banner,
  outdir: "build",
  naming: "[dir]/mustela.user.[ext]",
});
