const build = "build/mustela.user.js";
const built = await Bun.file(build).text();
await Bun.write(build, built.replaceAll("//!", "//"));
