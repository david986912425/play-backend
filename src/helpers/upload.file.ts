import path from 'path';
import fs from 'fs';
import { UploadedFile, FileArray } from 'express-fileupload';

const ALLOWED_EXTENSIONS = ['png', 'jpg', 'jpeg', 'gif'];
const DEFAULT_FOLDER = 'images';

export const uploadFile = (files: FileArray, productUuid: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const image = files.image as UploadedFile;

        if (!image) {
            return reject('No image file was provided.');
        }

        const nameParts = image.name.split('.');
        const extension = nameParts.pop()?.toLowerCase();

        if (!extension || !ALLOWED_EXTENSIONS.includes(extension)) {
            return reject(
                `La extension "${extension}" no esta permitido. Validar que sea: ${ALLOWED_EXTENSIONS.join(', ')}`
            );
        }

        const fileName = `${productUuid}.${extension}`;

        const folderPath = path.join(__dirname, '../uploads', DEFAULT_FOLDER);

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        const fullPath = path.join(folderPath, fileName);

        image.mv(fullPath, (err) => {
            if (err) return reject(err);

            const publicUrl = `/uploads/${DEFAULT_FOLDER}/${fileName}`;
            resolve(publicUrl);
        });
    });
};
