import * as dotenv from "dotenv";
import {DotenvParseOutput} from "dotenv";
import * as _ from "lodash";

export class ConfigContainer {
    env: DotenvParseOutput;

    [propName: string]: any;

    setEnv(env: { [propName: string]: any; }) {
        this.env = env;
    }

    constructor() {
        const result = dotenv.config();

        if (result.error) {
            throw result.error;
        }

        this.setEnv(result.parsed);
    }

    get(key: string, defaultValue?: undefined) {
        return _.get(this, key, defaultValue)
    }
}

export interface ConfigGetter {
    (key: string, defaultValue?: any): any;
}

export const getConfigGetter = (configContainer: ConfigContainer) => {
    return (key: string, defaultValue?: any): ConfigGetter => {
        return _.get(configContainer, key, defaultValue)
    }
};

export interface AppConfig {
    http?: { hostname: string, port: number | string };

    [propName: string]: any;
}

export interface DatabaseConfig {
    enable?: boolean;
    dialect?: string;
    host?: string;
    port?: number;
    database?: string;
    username?: string;
    password?: string;
    operatorsAliases?: boolean;
    queryLog?: boolean;
    define?: { freezeTableName: boolean, underscored: boolean, };
    benchmark?: boolean;
    logging?: boolean;

    [propName: string]: any;
}
