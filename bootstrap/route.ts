import Application from "../interfaces/Application";
import webRoutes from "../routes/web";
import * as Router from "koa-router";

export default (app: Application) => {
    app.router = new Router();

    webRoutes(app);

    app.use(app.router.routes());
};
