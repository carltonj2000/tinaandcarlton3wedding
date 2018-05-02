#!/usr/bin/env node

// image optimizations from
// https://developers.google.com/speed/docs/insights/OptimizeImages

const os = require("os");
const fs = require("fs");
const path = require("path");
const { execSync, mkdirSync } = require("child_process");

const images = require("./images")(os.hostname());

const sizes = ["1620x1080", "405x270", "81x54"];

const total = images.length;
const convert = (sizeIn, sizeOut) => {
  let current = 1;
  images.reduce((a, image) => {
    const fin = path.resolve(
      image.dir,
      "resized",
      "size_" + sizeIn,
      image.file
    );
    const dout = path.resolve(image.dir, "resized", "size_" + sizeOut);
    const fout = path.resolve(dout, image.file);
    const cmd = `convert '${fin}' -sampling-factor 4:2:0 -strip -resize ${sizeOut} -quality 85 -interlace JPEG -colorspace sRGB '${fout}'`;
    if (!fs.existsSync(dout)) fs.mkdirSync(dout);
    if (!fs.existsSync(fout)) {
      console.log(
        `Converting ${
          image.file
        } ${current}/${total} from ${sizeIn} to ${sizeOut}`
      );
      execSync(cmd, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        stdout && console.log(`stdout: ${stdout}`);
        stderr && console.log(`stderr: ${stderr}`);
      });
    } else {
      console.log(`Skipping ${image.file}`);
    }
    current++;
  }, []);
};

convert(sizes[0], sizes[1]);
convert(sizes[1], sizes[2]);
