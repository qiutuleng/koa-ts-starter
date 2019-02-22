import Application from "../interfaces/Application";
import * as fs from 'fs';
import * as path from 'path';

export default (app: Application) => {
    const config: { [propName: string]: any; } = {};

    const configPath = path.resolve(__dirname, '../config');

    const result: string[] = fs.readdirSync(configPath).filter(file => {
        const stats = fs.lstatSync(`${configPath}/${file}`);
        return file.indexOf('.') !== 0 && stats.isFile();
    });

    for (const fileName of result) {
        const itemConfig = require(`${configPath}/${fileName}`);
        config[fileName.split('.').shift()] = itemConfig.default;
    }

    app.config = config;
};
