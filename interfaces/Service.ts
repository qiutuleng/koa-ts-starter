import Application from "./Application";
import {Context} from "koa";

export default class Service {
    app: Application;
    ctx: Context;
    services: { [propName: string]: Service | any };

    constructor(app: Application) {
        this.app = app;
    }

    setCtx(ctx: Context) {
        this.ctx = ctx;
    }

    setServices(services: { [propName: string]: Service | any }) {
        this.services = services;
    }
}
