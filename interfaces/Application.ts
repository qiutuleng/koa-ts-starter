import * as Koa from 'koa';
import config from "../bootstrap/config";
import {Model, Sequelize, SequelizeStatic} from "sequelize";

class Application extends Koa {
    config: { [propName: string]: any; };
    sequelize: Sequelize;
    Sequelize: SequelizeStatic;
    models: { [propName: string]: Model<{ [propName: string]: any; }, { [propName: string]: any; }> };

    constructor() {
        super();
        this.config = config;
    }
}

export default Application;
