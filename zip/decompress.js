import { createBrotliDecompress } from 'node:zlib';
import { pipeline } from 'node:stream';
import { createReadStream, createWriteStream } from 'node:fs';
import { getPath } from '../path/path.js';
import { access, constants, rm } from 'node:fs/promises';

export const decompress = async (args) => {
    await new Promise((resolve, reject) => {
        const sourceFile = getPath(args[0])
        const destinationFile = getPath(args[1]);
        access(sourceFile, constants.R_OK)
            .then(
                () => {
                    const brotli = createBrotliDecompress();
                    const source = createReadStream(sourceFile);
                    const destination = createWriteStream(destinationFile, { flags: 'ax' });

                    pipeline(source, brotli, destination, (err) => {
                        if (err) {
                            reject(`error in pipeline stream: ${err}`);
                        } else {
                            resolve();
                        }
                    });
                })
            .catch((err) => { reject(`access error: ${err}`); })

    });
};