import express from "express";
import { S3 } from "aws-sdk";
const s3 = new S3({
    accessKeyId: "187e81ff3394a55f7e59c2e48ee8f8e9",
    secretAccessKey:
      "c9ac8bba0facd542f3afef1825109e231dd77a7be50f27e1905d3de7a1e199ee",
    endpoint: "https://3415fec7341a0355bd1ce61c06382798.r2.cloudflarestorage.com",
  });

const app = express();

app.get("/*", async (req, res) => {
    // id.100xdevs.com
    const host = req.hostname;

    const id = host.split(".")[0];
    const filePath = req.path;

    const contents = await s3.getObject({
        Bucket: "vineeth-vercel",
        Key: `dist/${id}${filePath}`
    }).promise();
    
    const type = filePath.endsWith("html") ? "text/html" : filePath.endsWith("css") ? "text/css" : "application/javascript"
    res.set("Content-Type", type);

    res.send(contents.Body);
})

app.listen(3001);