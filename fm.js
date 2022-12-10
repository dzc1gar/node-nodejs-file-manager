import { createInterface } from 'node:readline/promises';
import { EOL } from 'node:os';
import {fs, os, hash, zip, path} from './commands.js'

const usernameArgument = '--username';
const invalidInputMessage = 'Invalid input';
const operationFailedMessage = 'Operation failed';

const main = () => {
    if (process.argv.length > 3) {
        console.info(`please provide ${usernameArgument} argument only`);
        return;
    }
    if (process.argv.length < 3) {
        console.info(`please provide ${usernameArgument} argument with username`);
        return;
    }

    if (!process.argv[2].startsWith(`${usernameArgument}=`)) {
        console.info(`please provide ${usernameArgument} argument with username`);
        return;
    }
    if (process.argv[2].length == usernameArgument.length + 1) {
        console.info(`please provide username in ${usernameArgument} argument`);
        return;
    }

    const username = process.argv[2].substring(usernameArgument.length + 1);
    console.info(`Welcome to the File Manager, ${username}!`);

    process.on('SIGINT', () => {
        process.stdout.write(`${EOL}Thank you for using File Manager, ${username}, goodbye!${EOL}`);
        process.exit();
    });

    const rl = createInterface({
        input: process.stdin
    });

    path.pwd();

    rl.on('line', async (line) => {
        process.stdin.pause();
        try {
            const { command, args } = parseCommand(line);
            switch (command) {
                case '':
                    break;
                case '.exit':
                    await checkArgumentsAndRun(args, 0, os.exit);
                    break;
                case 'up':
                    await checkArgumentsAndRun(args, 0, path.up);
                    break;
                case 'cd':
                    await checkArgumentsAndRun(args, 1, path.cd);
                    break;
                case 'ls':
                    await checkArgumentsAndRun(args, 0, fs.ls);
                    break;
                case 'cat':
                    await checkArgumentsAndRun(args, 1, fs.cat);
                    break;
                case 'add':
                    await checkArgumentsAndRun(args, 1, fs.add);
                    break;
                case 'rn':
                    await checkArgumentsAndRun(args, 2, fs.rn);
                    break;
                case 'cp':
                    await checkArgumentsAndRun(args, 2, fs.cp);
                    break;
                case 'mv':
                    await checkArgumentsAndRun(args, 2, fs.mv);
                    break;
                case 'rm':
                    await checkArgumentsAndRun(args, 1, fs.rm);
                    break;
                case 'os':
                    await checkArgumentsAndRun(args, 1, os.os);
                    break;
                case 'hash':
                    await checkArgumentsAndRun(args, 1, hash.calc);
                    break;
                case 'compress':
                    await checkArgumentsAndRun(args, 2, zip.compress);
                    break;
                case 'decompress':
                    await checkArgumentsAndRun(args, 2, zip.decompress);
                    break;
                default:
                    console.info(invalidInputMessage);
            }
        } catch (err) {
            console.info(operationFailedMessage);
        } finally {
            path.pwd();
            process.stdin.resume();
        }
    });
}

const parseCommand = (line) => {
    const trimmedLine = line.trim();
    let command = "";
    let argsLine = "";
    if (trimmedLine.startsWith('"')) {
        const indx = trimmedLine.substring(1).indexOf('"');
        if (indx === -1) {
            command = trimmedLine
        } else {
            command = trimmedLine.substring(1, indx + 1);
            argsLine = trimmedLine.substring(command.length + 2).trim();
        }
    } else {
        const splited = trimmedLine.split(' ');
        command = splited[0];
        if (splited.length > 1) {
            argsLine = splited.slice(1).join(' ');
        }
    }

    let args = new Array(0);
    if (argsLine.length > 0) {
        if (argsLine.indexOf('"') === -1) {
            args = argsLine.split(' ');
        } else {
            let str = "";
            let wasFirstQuote = false;
            for (let i = 0; i < argsLine.length; i++) {
                const char = argsLine[i];
                switch (char) {
                    case '"':
                        if (wasFirstQuote) {
                            wasFirstQuote = false;
                            str = str.replace('"', '');
                        } else {
                            wasFirstQuote = true;
                            str += char;
                        }
                        break;
                    case ' ':
                        if (wasFirstQuote) {
                            str += char;
                        } else {
                            args.push(str);
                            str = "";
                        }
                        break;
                    default:
                        str += char;
                }
            }
            if (str.length !== 0) {
                args.push(str);
            }
        }
    }
    return {
        command,
        args
    }
}

const checkArgumentsAndRun = async (args, count, callback) => {
    if (count === 0 && (!args || args.length === 0)) {
        await callback();
        return;
    }
    if (args && args.length === count) {
        await callback(args);
        return
    }
    console.info(invalidInputMessage);
}

main();