import { S3 } from "aws-sdk";
import upload from "@config/upload";
import fs from "fs";
import mime from "mime";
import { resolve } from "path";
import { IStorageProvider } from "../IStorageProvider";

class S3StorageProvider implements IStorageProvider {

    private client: S3;

    constructor() {
        this.client = new S3({
            region: process.env.AWS_BUCKET_REGION,
        });
    };

    async save(file: string, folder: string): Promise<string> {
        const originalName = resolve(upload.tmpFolder, file);

        const fileContent = await fs.promises.readFile(originalName);

        const contentType = mime.getType(originalName);

        await this.client.putObject({
            Bucket: `${process.env.AWS_BUCKET}/${folder}`,
            Key: file,
            ACL: "public-read",
            Body: fileContent,
            ContentType: contentType
        }).promise();

        // Após inserir o arquivo no Bucket, excluo o mesmo da pasta Tmp
        await fs.promises.unlink(originalName);

        return file;
    };

    async delete(file: string, folder: string): Promise<void> {
        await this.client.deleteObject({
            Bucket: `${process.env.AWS_BUCKET}`,
            Key: file
        }).promise();
    };
};

export { S3StorageProvider };