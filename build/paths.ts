import path from "path";

const projRoot = path.resolve(__dirname, "../");
const pkgRoot = path.resolve(projRoot, "./packages");
const compRoot = path.resolve(pkgRoot, "./components");
const buildOutput = path.resolve(projRoot, "./dist");
const utilRoot = path.resolve(pkgRoot, "./utils");
export { projRoot, pkgRoot, buildOutput, utilRoot, compRoot };
