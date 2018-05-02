#!/usr/bin/env node

// image optimizations from
// https://developers.google.com/speed/docs/insights/OptimizeImages

const fs = require("fs");
const path = require("path");
const { execSync, mkdirSync } = require("child_process");

const images = require("./images")();

const sizes = ["1620x1080", "405x270", "81x54"];

const link = sz => {
  images.reduce((a, image) => {
    const src = path.resolve(image.dir, "resized", "size_" + sz, image.file);
    const dstd = path.resolve("./src/images/", "resized", "size_" + sz);
    const dst = path.resolve(dstd, image.file);
    if (!fs.existsSync(dstd)) execSync(`mkdir -p ${dstd}`);
    const cmd = `ln -sf '${src}' '${dst}'`;
    if (!fs.existsSync(src)) {
      console.log(`Exiting, due to missing file ${src}`);
      process.exit(-1);
    }
    execSync(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      stdout && console.log(`stdout: ${stdout}`);
      stderr && console.log(`stderr: ${stderr}`);
    });
  }, []);
};

sizes.reduce((a, sz) => {
  link(sz);
}, []);
