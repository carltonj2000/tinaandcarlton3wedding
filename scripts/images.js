const path = require("path");
const fs = require("fs");

module.exports = (host = "CARLTONs-MacBook-Pro.local") => {
  host = "CARLTONs-MacBook-Pro.local";
  const imageDirsAll = [
    {
      index: "1", // could be uuid but incrementing for now
      description: "Flamingo",
      locations: [
        {
          machine: "CARLTONs-MacBook-Pro.local",
          dir:
            "/Volumes/cj1Tera3/carltonData/cj_pics/pics2018/wedding/weddingChapelPro/High_Resolution",
          description: "'workstation mapped directory on the MBP'"
        },
        {
          machine: "workstation",
          dir: "tbd"
        }
      ]
    },
    {
      index: "2",
      description: "Lake Las Vegas",
      locations: [
        {
          machine: "CARLTONs-MacBook-Pro.local",
          dir:
            "/Volumes/cj1Tera3/carltonData/cj_pics/pics2018/wedding/weddingDayPhotographer/carltontina-photo-download-part1of1/highlights",
          description: "'workstation mapped directory on the MBP'"
        }
      ]
    }
  ];

  const imageDir = imageDirsAll.reduce((a, d) => {
    const location = d.locations.filter(l => l.machine === host);
    delete d.locations;
    d.location = location[0];
    a.push(d);
    return a;
  }, []);
  const getDir = index => imageDir.filter(i => index === i.index)[0];
  const imagesDirs = [
    {
      skip: true,
      dir: getDir("1").location.dir,
      description: getDir("1").description,
      images: [
        { file: "[136671]001.jpg", groups: ["flamingo"], portrait: true },
        { file: "[136671]004.jpg", groups: ["flamingo"], portrait: true },
        { file: "[136671]005.jpg", groups: ["flamingo"] },
        { file: "[136671]012.jpg", groups: ["flamingo"] },
        { file: "[136671]020.jpg", groups: ["flamingo"], portrait: true },
        { file: "[136671]024.jpg", groups: ["flamingo"], portrait: true },
        { file: "[136671]027.jpg", groups: ["flamingo"], portrait: true },
        { file: "[136671]030.jpg", groups: ["flamingo"] },
        { file: "[136671]035.jpg", groups: ["flamingo"] },
        { file: "[136671]037.jpg", groups: ["flamingo"], portrait: true },
        { file: "[136671]038.jpg", groups: ["flamingo"], portrait: true },
        { file: "[136671]039.jpg", groups: ["flamingo"], portrait: true },
        { file: "[136671]045.jpg", groups: ["flamingo"], portrait: true },
        { file: "[136671]051.jpg", groups: ["flamingo"] },
        { file: "[136671]057.jpg", groups: ["flamingo"] },
        { file: "[136671]060.jpg", groups: ["flamingo"] },
        { file: "[136671]067.jpg", groups: ["flamingo"], portrait: true },
        { file: "[136671]071.jpg", groups: ["flamingo"] },
        { file: "[136671]093.jpg", groups: ["flamingo"] },
        { file: "[136671]097.jpg", groups: ["flamingo"] },
        { file: "[136671]099.jpg", groups: ["flamingo"] },
        { file: "[136671]100.jpg", groups: ["flamingo"] },
        { file: "[136671]102.jpg", groups: ["flamingo"] },
        { file: "[136671]123.jpg", groups: ["flamingo"], portrait: true },
        { file: "[136671]138.jpg", groups: ["flamingo"], portrait: true }
      ]
    },
    {
      //skip: true,
      dir: getDir("2").location.dir,
      description: getDir("2").description,
      images: [
        { file: "untitled(2of170).jpg", groups: ["lakelasvegas"] },
        { file: "untitled(8of170).jpg", groups: ["lakelasvegas"] },
        {
          file: "untitled(13of170).jpg",
          groups: ["lakelasvegas"],
          portrait: true
        },
        { file: "untitled(15of170)-Edit.jpg", groups: ["lakelasvegas"] },
        { file: "untitled(33of170).jpg", groups: ["lakelasvegas"] },
        {
          file: "untitled(40of170).jpg",
          groups: ["lakelasvegas"],
          portrait: true
        },
        { file: "untitled(50of170).jpg", groups: ["lakelasvegas"] },
        { file: "untitled(56of170).jpg", groups: ["lakelasvegas"] },
        { file: "untitled(73of170).jpg", groups: ["lakelasvegas"] },
        { file: "untitled(74of170).jpg", groups: ["lakelasvegas"] },
        { file: "untitled(127of170).jpg", groups: ["lakelasvegas"] },
        { file: "untitled(129of170).jpg", groups: ["lakelasvegas"] },
        { file: "untitled(136of170).jpg", groups: ["lakelasvegas"] },
        { file: "untitled(138of170).jpg", groups: ["lakelasvegas"] },
        { file: "untitled(154of170).jpg", groups: ["lakelasvegas"] },
        {
          file: "untitled(160of170).jpg",
          groups: ["lakelasvegas"],
          portrait: true
        }
      ]
    }
  ];

  const images = imagesDirs.reduce((a, dir) => {
    //if (dir.skip) return a; // uncomment not to convert file repetitively
    const images = dir.images.reduce((a2, img) => {
      a2.push({
        dir: dir.dir,
        description: img.description || dir.description,
        ...img
      });
      return a2;
    }, []);
    a.push(...images);
    return a;
  }, []);

  const uniqueIndex = () => {
    imageDirsAll.reduce((a, d) => {
      if (a.includes(d.index)) {
        console.log(`index ${d.index} is not allowed to be used twice`);
        process.exit(-1);
      }
      a.push(d.index);
      return a;
    }, []);
  };

  const imagesExists = images => {
    images.reduce((a, d) => {
      const file = path.join(d.dir, d.file);
      if (!fs.existsSync(file)) {
        console.log(`file ${d.file} not found in ${d.dir}`);
        process.exit(-1);
      }
      if (a.includes(file)) {
        console.log(`duplicate definition for file ${d.file} in ${d.dir}`);
        process.exit(-1);
      }
      a.push(file);
      return a;
    }, []);
  };

  uniqueIndex();
  imagesExists(images);

  return images;
};
