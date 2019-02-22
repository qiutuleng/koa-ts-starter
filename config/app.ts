import {DotenvParseOutput} from "dotenv";
import {AppConfig} from "../interfaces/Config"

export default (env: DotenvParseOutput) => {
    const config: AppConfig = {};

    config.http = {
        hostname: env.HOSTNAME || '127.0.0.1',
        port: env.PORT || 3000,
    };

    return config;
};
