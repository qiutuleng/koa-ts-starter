import Application from "../interfaces/Application";
import * as fs from 'fs';
import * as path from 'path';
import {ConfigContainer, getConfigGetter} from "../interfaces/Config";

export default (app: Application) => {
    const ConfigInstance = new ConfigContainer();

    const config: { [propName: string]: any; } = {};

    const configPath = path.resolve(__dirname, '../config');

    const result: string[] = fs.readdirSync(configPath).filter(file => {
        const stats = fs.lstatSync(`${configPath}/${file}`);
        return file.indexOf('.') !== 0 && stats.isFile();
    });

    for (const fileName of result) {
        let caller = require(`${configPath}/${fileName}`);

        if (typeof caller === 'object') {
            // ES6 module compatibility
            caller = caller.default;
        }

        config[fileName.split('.').shift()] = caller(ConfigInstance.env);
    }

    Object.assign(ConfigInstance, config);

    app.config = getConfigGetter(ConfigInstance);
};
