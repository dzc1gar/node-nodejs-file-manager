import { createBrotliCompress } from 'node:zlib';
import { pipeline } from 'node:stream';
import { createReadStream, createWriteStream } from 'node:fs';
import { getPath } from '../path/path.js';
import { stat } from 'node:fs/promises'

export const compress = async (args) => {
    await new Promise((resolve, reject) => {
        const sourceFile = getPath(args[0]);
        stat(sourceFile)
            .then((val) => {
                if (!val.isFile()) {
                    reject("source isn't file");
                    return;
                }
                const brotli = createBrotliCompress();
                const source = createReadStream(sourceFile);
                const destination = createWriteStream(getPath(args[1]), { flags: 'ax' });
                pipeline(source, brotli, destination, (err) => {
                    if (err) {
                        reject(`error in pipline stream: ${err}`);
                    } else {
                        resolve();
                    }
                });
            })
            .catch(
                (err) => {
                    reject(`error stat: ${err}`)
                }
            )
    });
};