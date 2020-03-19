const express = require("express");
const app = express();
const ytdl = require("ytdl-core");
const cors = require("cors");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");

ffmpeg.setFfmpegPath(ffmpegPath);

app.use(cors());

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

app.use(express.static("./client/"));

app.get("/download", (req, res) => {
  const URL = req.query.URL;
  ytdl.getInfo(URL, function(err, info) {
    if (typeof info !== "undefined") {
      const uri = info.title;
      const fixed = encodeURI(uri);
      Download(URL, res, fixed);
    } else if (typeof info == "undefined") {
      res.redirect("/wrong.html");
    }
  });
});
function filePreset(ffmpeg) {
  ffmpeg.format("mp3");
}

function Download(URL, res, fixed) {
  res.header(`Content-Disposition`, `attachment; filename=${fixed}.mp3`);
  const stream = ytdl(URL, {
    quality: "highestaudio",
    filter: "audioandvideo"
  });
  ffmpeg(stream)
    .preset(filePreset)
    .audioBitrate(128)
    .pipe(fs.createWriteStream(res));
  //fs.createWriteStream(res)
}

app.get("*", (req, res) => {
  res.status(404);
  res.redirect("/404.html");
});
