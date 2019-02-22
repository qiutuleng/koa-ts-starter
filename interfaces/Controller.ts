import {Context} from "koa";
import Service from "./Service";

export default class Controller {
    [propName: string]: any;

    ctx: Context;
    services: { [propName: string]: Service | any };

    setCtx(ctx: Context) {
        this.ctx = ctx;
    }

    setServices(services: {}) {
        this.services = services;
    }
}
