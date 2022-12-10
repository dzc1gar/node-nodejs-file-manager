import os from 'node:os'
import path from 'node:path';
import { access, constants } from 'node:fs/promises';

let currentDir = os.homedir();

export const getPath = (to) => {
    if (path.isAbsolute(to)) {
        return to;
    } else {
        return path.join(currentDir, to);
    }
}

export const pwd = () => {
    console.info(`You are currently in ${currentDir}`);
}

export const up = async () => {
    await cd(['..'])
}

export const cd = async (args) => {
    const tmpDir = getPath(args[0]);
    await access(tmpDir, constants.X_OK);
    currentDir = tmpDir;
}