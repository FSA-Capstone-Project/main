const fs = require("fs");
const PNG = require("pngjs").PNG;

fs.createReadStream("undersea.png")
  .pipe(new PNG())
  .on("parsed", function () {
    // this.data is a one-dimensional array of bytes
    // representing the image data
    console.log(this.width, this.height);
  });
