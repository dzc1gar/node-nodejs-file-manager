import { access, rename, constants } from 'node:fs/promises';
import { getPath } from '../path/path.js';

export const rn = async (args) => {
    let fileName = getPath(args[1]);
    try {
        await access(fileName, constants.X_R | constants.X_W | constants.X_X);
        throw new Error('destination file exists');
    } catch (err) {
        if (err.code !== 'ENOENT') throw err;
        await rename(getPath(args[0]), fileName);
    }
}
