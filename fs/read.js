import { createReadStream } from 'node:fs';
import { getPath } from '../path/path.js';

export const read = async (args) => {
    await new Promise((resolve, reject) => {
        const fileStream = createReadStream(getPath(args[0]));
        fileStream.on('data', (data) => {
            process.stdout.write(data);
        });
        fileStream.on('error', (err) => {
            reject(`error in file stream: ${err}`);
        });
        fileStream.on('close', () => {
            resolve();
        });
    });
}