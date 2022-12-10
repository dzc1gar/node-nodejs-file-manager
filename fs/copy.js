import { stat } from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { getPath } from '../path/path.js';

export const copy = async (args) => {
    await new Promise((resolve, reject) => {
        const sourceFileName = getPath(args[0]);
        stat(sourceFileName)
            .then((sourcefileInfo) => {
                if (!sourcefileInfo.isFile()) {
                    reject("source isn't file");
                    return;
                }
                const source = createReadStream(sourceFileName);
                const dest = createWriteStream(getPath(args[1]), { flags: 'ax' });
                dest.on('error', (err) => {
                    reject(`error in destination stream: ${err}`);
                });
                source.on('data', (data) => {
                    dest.write(data);
                });
                source.on('error', (err) => {
                    reject(`error in source stream: ${err}`);
                });
                source.on('close', () => {
                    resolve();
                });
            })
            .catch(
                (err) => { reject(`get stats of path: ${err}`); }
            );
    });
}