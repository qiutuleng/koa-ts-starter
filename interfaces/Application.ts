import * as Koa from 'koa';
import config from "../bootstrap/config";
import {Model, Sequelize, SequelizeStatic} from "sequelize";
import Service from "./Service";

export default class Application extends Koa {
    config: { [propName: string]: any; };
    sequelize: Sequelize;
    Sequelize: SequelizeStatic;
    models: { [propName: string]: Model<{ [propName: string]: any; }, { [propName: string]: any; }> | any };
    services: { [propName: string]: Service | { [propName: string]: any } };

    constructor() {
        super();
        this.config = config;
    }
}
