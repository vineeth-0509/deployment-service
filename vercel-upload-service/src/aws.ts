import { S3 } from "aws-sdk";
import fs from "fs";

const s3 = new S3({
    accessKeyId: "187e81ff3394a55f7e59c2e48ee8f8e9",
    secretAccessKey:
      "c9ac8bba0facd542f3afef1825109e231dd77a7be50f27e1905d3de7a1e199ee",
    endpoint: "https://3415fec7341a0355bd1ce61c06382798.r2.cloudflarestorage.com",
  });
// fileName => output/12312/src/App.jsx
// filePath => /Users/harkiratsingh/vercel/dist/output/12312/src/App.jsx
export const uploadFile = async (fileName: string, localFilePath: string) => {
    const fileContent = fs.readFileSync(localFilePath);
    const response = await s3.upload({
        Body: fileContent,
        Bucket: "vineeth-vercel",
        Key: fileName,
    }).promise();
    console.log(response);
}