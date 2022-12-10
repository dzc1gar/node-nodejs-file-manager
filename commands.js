import { osCommand, exit } from './os/os.js';
import { pwd, up, cd } from './path/path.js';
import { compress } from './zip/compress.js';
import { decompress } from './zip/decompress.js';
import { calculateHash } from './hash/calcHash.js';
import { copy } from './fs/copy.js';
import { create } from './fs/create.js';
import { remove } from './fs/remove.js';
import { list } from './fs/list.js';
import { move } from './fs/move.js';
import { read } from './fs/read.js';
import { rn } from './fs/rename.js';

export const fs ={
    cp: copy,
    add: create,
    rm: remove,
    ls: list,
    mv: move,
    cat: read,
    rn
}


export const os = {
    os: osCommand, 
    exit
};

export const path = {
    pwd, up, cd
}

export const zip = {
    compress, decompress
}

export const hash = {
    calc: calculateHash
}