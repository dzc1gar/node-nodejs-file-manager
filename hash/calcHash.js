import { createReadStream } from 'node:fs';
const { createHash } = await import('node:crypto');
import { getPath } from '../path/path.js';

export const calculateHash = async (args) => {
    await new Promise((resolve, reject) => {
        const hash = createHash('sha256');
        const input = createReadStream(getPath(args[0]));
        input.on('readable', () => {
            let data;
            while (null !== (data = input.read())) {
                hash.update(data);
            }
        });

        input.on('end', () => {
            console.info(hash.digest('hex'));
            resolve();
        });

        input.on('error', (err) => {
            reject(`error in input stream: ${err}`);
        });
    });
}