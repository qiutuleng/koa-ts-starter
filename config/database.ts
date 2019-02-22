import {DotenvParseOutput} from "dotenv";
import {DatabaseConfig} from "../interfaces/Config"

export default (env: DotenvParseOutput) => {
    const config: DatabaseConfig = {};

    // Enable Database.
    config.enable = true;

    config.dialect = 'mysql';

    config.host = env.DB_HOST;

    config.port = Number.parseInt(env.DB_PORT || '3306');

    config.database = env.DB_DATABASE;

    config.username = env.DB_USERNAME;

    config.password = env.DB_PASSWORD;

    config.operatorsAliases = false;

    config.queryLog = true;

    return config;
};
