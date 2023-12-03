const mongoose = require("mongoose");
const express = require("express");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
var cors = require("cors");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { uploadFile, getFileStream } = require("./s3");
const { error } = require("console");

const app = express();
app.use(cors());

const Users = require("./models/userModel");

app.get("/upload/:key", (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);

  // res.send(readStream)
  readStream.pipe(res)
  
  // readStream.on("data", function (chunk) {
  //   console.log(JSON.parse(chunk.toString()));
  //   // res.json(chunk.toString())
  // });
});

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    console.log(file.path);

    // apply filter
    // resize

    const result = await uploadFile(file);
    const newUser = await Users.create({
      filename: file.originalname,
      key: result.Key,
      url: result.Location,
    });
    await unlinkFile(file.path);
    console.log(result);
    res.send({ imagePath: `/images/${result.Key}` });
  } catch (error) {
    console.error(error);
  }
});

app.get("/get-users", async (req, res) => {
  try {
    const users = await Users.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
});
// app.post('/user',async (req,res)=>{
//   try{
//     const newproduct = await Users.create()

//   }
//   catch(error){console.error(error)}
// })
// /************************************/

mongoose
  .connect(
    "mongodb+srv://asok0968:abhi1243@cavli.vbv9d9u.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("conncted to mongoDb");
    app.listen(8080, () => console.log("listening on port 8080"));
  })
  .catch((error) => console.log(error));
