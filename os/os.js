import os from 'node:os'

export const exit = () => {
    process.emit('SIGINT');
}

export const osCommand = (args) => {
    switch (args[0]) {
        case "--EOL":
            console.info(JSON.stringify(os.EOL).replaceAll('"', ''));
            break;
        case "--cpus":
            const cpus = os.cpus();
            console.info(`Total cpus: ${cpus.length}`);
            cpus.forEach((val, indx) => {
                console.info(`${indx} - model: ${val.model}, speed: ${val.speed / 100} GHz`);
            });
            break;
        case "--homedir":
            console.info(os.homedir());
            break;
        case "--username":
            console.info(os.userInfo().username);
            break;
        case "--architecture":
            console.info(os.arch());
            break;
        default:
            throw new Error("unknown command");
    }
}