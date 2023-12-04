const crypto = require('crypto');
const util = require("util");
// import { promisify } from "util"
const randomBytes = util.promisify(crypto.randomBytes)
require("dotenv").config();
const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");



const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// uploads a file to s3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
}
exports.uploadFile = uploadFile;

// downloads a file from s3
// function getFileStream(fileKey) {
//   const downloadParams = {
//     Key: fileKey,
//     Bucket: bucketName,
//   };

//   let x = s3.getObject(downloadParams, (err, data) => {
//     if (err) {
//       return err;
//     }

//     let objectData = data.Body.toString("utf-8");
//     // console.log(objectData)
//   });
//   return x

// }

function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }

  return s3.getObject(downloadParams).createReadStream()
}


exports.getFileStream = getFileStream;



async function generateUploadURL() {
  const rawBytes = await randomBytes(16)
  const imageName = rawBytes.toString('hex')

  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
    ContentType: 'application/json', // Set the content type to JSON

  })
  
  const uploadURL = await s3.getSignedUrlPromise('putObject', params)
  return {uploadURL,imageName}
}

exports.generateUploadURL = generateUploadURL


// async function uploadUrl(filename,contentype){
//   const command = new s3.putObject({
//     Bucket : bucketName,
//     Key:filename,   
//   })
//   const url = await generateUploadURL()
//   return url;
// }exports.uploadUrl = uploadUrl


