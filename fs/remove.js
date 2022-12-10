import { rm } from 'node:fs/promises';
import { getPath } from '../path/path.js';

export const remove = async (args) => {
    await rm(getPath(args[0]));
}