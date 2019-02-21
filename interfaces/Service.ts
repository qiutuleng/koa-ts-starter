import Application from "./Application";
import {Context} from "koa";

export default class Service {
    app: Application;
    ctx: Context;

    constructor(app: Application) {
        this.app = app;
    }

    setCtx(ctx: Context) {
        this.ctx = ctx;
    }
}
