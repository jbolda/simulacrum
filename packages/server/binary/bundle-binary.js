// eslint-disable-next-line @typescript-eslint/no-var-requires
const { compile } = require("nexe");

compile({
  // build: true, //required to use patches
  input: "./dist/start.js",
  output: "./dist/simulacrum-server",
  // binary creation walks the node require and "treeshakes"
  // since the UI is pulled in via the filesystem, we need to include the whole folder
  // as a resource to be picked up in the binary
  // workspaces are a symlink, so from the perspective of the binary creation,
  // a workspace package is just "another package", so we add it as a resource through
  // the node_modules referenced symlink (which is where it would be if it was published)
  resources: [
    "../../node_modules/@simulacrum/ui/dist/**/*",
    "../../node_modules/fp-ts/**/*",
  ],
})
  .then(() => {
    console.log("success");
  })
  .catch((e) => {
    throw new Error(e);
  });
