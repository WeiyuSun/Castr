const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3")
const Result = require("../util/Result")
const crypto = require('crypto');
require("dotenv").config;

const s3 = new S3Client({
    region: "us-east-2",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});
const bucketName = "comp4350";

const randomImageName = (bytes = 32) => {
    return crypto.randomBytes(bytes).toString("hex");
}

const deleteImage = (req, res) => {
    const tokens = req.body.image.split('/');
    const key = tokens[tokens.length - 1];

    const params = {
        Bucket: bucketName,
        Key: key,
    }

    const command = new DeleteObjectCommand(params);
    s3.send(command).then(() => {
        res.json(Result.success("Successfully deleted the image"));
    }).catch((err) => {
        res.json(Result.fail("Failed to delete image"));
    })
}

const uploadImage = (req, res) => {
    const name = randomImageName();

    const params = {
        Bucket: bucketName,
        Key: name,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
    }
    
    const command = new PutObjectCommand(params);
    s3.send(command).then((result) => {
        res.json(Result.success({imageUrl: `https://comp4350.s3.us-east-2.amazonaws.com/${name}`}));
    }).catch((err) => {
        res.json(Result.fail("Failed to upload image"));
    })
};

module.exports = {uploadImage, deleteImage};