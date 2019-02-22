import * as Koa from 'koa';
import {Model, Sequelize, SequelizeStatic} from "sequelize";
import Service from "./Service";
import Controller from "./Controller";
import * as Router from "koa-router";
import {ConfigGetter} from "./Config";

export default class Application extends Koa {
    config: ConfigGetter;
    sequelize: Sequelize;
    Sequelize: SequelizeStatic;
    models: { [propName: string]: Model<{ [propName: string]: any; }, { [propName: string]: any; }> | any };
    services: { [propName: string]: Service | { [propName: string]: any } };
    router: Router;
    controllers: { [propName: string]: Controller | { [propName: string]: any } };
}
