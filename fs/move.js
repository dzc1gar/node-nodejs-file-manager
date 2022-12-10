import { copy } from './copy.js';
import { access, constants, rm } from 'node:fs/promises';
import { getPath } from '../path/path.js';
import path from 'node:path';

export const move = async (args) => {
    const sourceFile = getPath(args[0]);
    await access(path.dirname(sourceFile), constants.W_OK);
    await copy(args);
    await rm(sourceFile, { force: true });
}