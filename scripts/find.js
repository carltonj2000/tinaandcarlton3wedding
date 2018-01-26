const { exec } = require("child_process");

if (process.argv.length !== 3) {
  console.log("Enter one argument as the search string");
  process.exit(-1);
}

const str = process.argv[2];

const cmd =
  "find . " +
  "-not \\( -path ./node_modules -prune \\) " +
  "-not \\( -path ./.git -prune \\) " +
  "-not \\( -path ./build -prune \\) " +
  "-name \\*.js " +
  "-exec grep -iH '" +
  str +
  "' {} \\;";

exec(cmd, (err, stdout, strdrr) => {
  if (err) {
    console.log("Node could not exeucte the command");
    return;
  }

  console.log(stdout);
});
