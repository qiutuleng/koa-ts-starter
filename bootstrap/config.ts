import * as fs from 'fs';
import * as path from 'path';

const config: {[propName: string]: any;} = {};

const configPath = '../config';

const result: string[] = fs.readdirSync(path.resolve(__dirname, configPath)).filter(path => path.split('.').pop() === 'ts');

for (const fileName of result) {
    const itemConfig = require(`${configPath}/${fileName}`);
    config[fileName.split('.').shift()] = itemConfig.default;
}

export default config;
