/*
upload function works!!!
our client (s3) is connected to aws already (i tested it out on s3Client.js)
s3 knows how to talk to aws 
PutObjectCommand allows us to POST smth to aws 
we need to specify bucket, key, and body 
l8er key will be actual path to file and the body will contain Buffer (raw bytes of file)
we'll set ContentType to mimetype to specify the file extension 

we'll be sent....
1. key (path)
2. data (bytes)
3. content-type (mimetype)
...from our fe

actually we r gonna use FormData^^

*/
import  s3  from "../aws/s3Client.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { pool } from "../db/db.js";
import { randomUUID } from "crypto";

export const upload = async (req, res) => {
    try {
        /////
        const userId = req.user.id;
        console.log(userId);
        ////
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }

        const uploadedFiles = [];

        for (const file of req.files) {
            const fileId = randomUUID();
            //userId will be same as psql db
            const key = `users/${userId}/${fileId}-${file.originalname}`;

            await s3.send(
                new PutObjectCommand({
                    Bucket: process.env.S3_BUCKET_NAME,
                    Key: key,
                    Body: file.buffer,//
                    ContentType: file.mimetype,
                })
            );

            const result = await pool.query(
                `INSERT INTO files
        (id, user_id, file_name, file_type, file_size, s3_key)
        VALUES ($1,$2,$3,$4,$5,$6)
        RETURNING *`,
                [
                    fileId,
                    userId,
                    file.originalname,
                    file.mimetype,
                    file.size,
                    key,
                    //   process.env.S3_BUCKET_NAME, i only have  1 bucket for now
                ]
            );

            uploadedFiles.push(result.rows[0]);
        }

        return res.status(200).json({
            message: "Upload successful",
            success: true,
            files: uploadedFiles,
        });
    } catch (err) {
        console.error("Upload error:", err);
        return res.status(500).json({ message: "Upload failed" });
    }
};