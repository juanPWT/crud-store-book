const multer = require("multer");
const path = require("path");

//multer init
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/img/cover");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage }).single("cover");

//end of multer init

module.exports = upload;
