#!/usr/bin/env node

// image optimizations from
// https://developers.google.com/speed/docs/insights/OptimizeImages

const os = require("os");
const fs = require("fs");
const path = require("path");
const { execSync, mkdirSync } = require("child_process");

const images = require("./images")(os.hostname());

const sizes = ["1620x1080", "405x270", "81x54"];

let imgConst = [];
let imgExports = [];

const gen = sz => {
  images.reduce((a, image) => {
    const partNames = image.file.split(".");
    if (partNames.slice(-1)[0] === "JPG") return; /* remove me. bug avoidence */
    const baseName = partNames[0]
      .replace("(", "_")
      .replace(")", "_")
      .replace("[", "_")
      .replace("]", "_")
      .replace("-", "_");
    imgConst.push(
      `const ${baseName}_${sz} = require("../images/resized/size_${sz}/${
        image.file
      }")`
    );
    const last = image.groups.length - 1;
    const groups =
      image.groups.reduce((a, group, i) => {
        return `${a} "${group}" ${i === last ? "" : ","}`;
      }, "[") + "]";
    imgExports.push(
      `{ name: ${baseName}_${sz}, file: "${baseName}", description: "${
        image.description
      }", groups: ${groups} },`
    );
  }, []);
};

sizes.reduce((a, sz) => {
  imgExports.push(`exports.images_${sz} = [`);
  gen(sz);
  imgExports.push("];");
}, []);

const fileOut = "./src/utils/images.js";
const fileOutData = imgConst.join(";\n") + "\n" + imgExports.join("\n");
fs.writeFile(fileOut, fileOutData, err => {
  if (err) return console.log(err);
  console.log(`Wrote file ${fileOut}`);
});
