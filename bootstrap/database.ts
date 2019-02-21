import Application from "../interfaces/Application";
import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';
import {Model} from 'sequelize';
import * as _ from 'lodash';

export default (app: Application) => {
    app.Sequelize = Sequelize;

    const defaultConfig = {
        delegate: 'model',
        baseDir: 'model',
        host: 'localhost',
        port: 3306,
        username: 'root',
        benchmark: true,
        define: {
            freezeTableName: false,
            underscored: true,
        },
    };

    const config: { [propName: string]: any; } = Object.assign({}, defaultConfig, app.config.database);

    if (config.queryLog === false) {
        config.logging = null;
    }

    app.sequelize = new Sequelize(config.database, config.username, config.password, config);

    const modelsPath = path.resolve('app/Models');

    const models: { [propName: string]: any; } = {};

    fs.readdirSync(modelsPath)
        .filter((file) => {
            const stats = fs.lstatSync(`${modelsPath}/${file}`);
            return (file.indexOf('.') !== 0) && stats.isFile();
        })
        .forEach((file) => {
            let caller = require(path.join(modelsPath, file));

            if (typeof caller === 'object') {
                // ES6 module compatibility
                caller = caller.default;
            }
            const model: Model<{}, {}> = caller(app);

            models[_.upperFirst(_.camelCase(model.name))] = model;
        });

    app.models = models;

    Object.keys(models).forEach((modelName: string) => {
        typeof models[modelName].associate === 'function' && models[modelName].associate();
    });

    app.use(async (ctx, next) => {
        ctx.models = models;
        await next()
    });
}
