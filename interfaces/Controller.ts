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

    send(message: any, statusCode = 200, headers: { [propName: string]: string } = {}) {
        const {ctx} = this;

        Object.keys(headers).forEach((headerName: string) => {
            ctx.set(headerName, headers[headerName]);
        });

        ctx.body = message;
        ctx.status = statusCode;
    }

    sendError(message: any, statusCode = 422, headers: { [propName: string]: string } = {}) {
        return this.send(message, statusCode, headers);
    }
}
