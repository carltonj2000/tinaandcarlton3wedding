#!/usr/bin/env node

const os = require("os");
const fs = require("fs");
const path = require("path");
const { execSync, mkdirSync } = require("child_process");

const images = require("./images")("CARLTONs-MacBook-Pro.local");

const localExtSdPath = "/Volumes/cjs/cj/volume_sfo2_02/cj_pics/";
const sizes = ["1620x1080", "405x270", "81x54"];

const cp = size => {
  images.map(image => {
    const sz = "size_" + size;
    const src = path.join(image.dir, "resized", sz, image.file);
    const outdir = path.join(
      localExtSdPath,
      image.dir.split("cj_pics")[1],
      "resized",
      sz
    );
    const dst = path.join(outdir, image.file);
    if (!fs.existsSync(outdir)) fs.mkdirSync(outdir, { recursive: true });
    if (!fs.existsSync(dst)) fs.copyFileSync(src, dst);
  });
};

sizes.map(size => cp(size));
