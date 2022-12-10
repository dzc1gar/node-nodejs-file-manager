import { writeFile } from 'node:fs/promises';
import { getPath } from '../path/path.js';

export const create = async (args) => {
    await writeFile(getPath(args[0]), '', { flag: 'ax' });
}
