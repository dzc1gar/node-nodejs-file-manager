import { readdir } from 'node:fs/promises';
import { getPath } from '../path/path.js';

class FileObject {
    constructor(dirent) {
        this.Name = dirent.name;
        if (dirent.isSymbolicLink()) {
            this.Type = 'symbolic link';
        } else if (dirent.isSocket()) {
            this.Type = 'socket';
        } else if (dirent.isFile()) {
            this.Type = 'file';
        } else if (dirent.isFIFO()) {
            this.Type = 'FIFO';
        } else if (dirent.isDirectory()) {
            this.Type = 'directory';
        } else if (dirent.isCharacterDevice()) {
            this.Type = 'character device';
        } else if (dirent.isBlockDevice()) {
            this.Type = 'block device';
        }
    }
}

export const list = async () => {
    const files = Array(0);
    const list = await readdir(getPath('.'), { withFileTypes: true });
    list.forEach((value) => { files.push(new FileObject(value)) });
    console.table(files);
}
