import Application from "../interfaces/Application";
import * as bodyParser from 'koa-bodyparser';
import {Context} from "koa";
import * as formidable from 'formidable';

export default (app: Application) => {
    app.use(bodyParser());

    app.use(async (ctx: Context, next) => {
        const header = ctx.headers['content-type'];

        if (header && header.indexOf('multipart/form-data') === 0) {
            const form = new formidable.IncomingForm();

            await new Promise((reslove, reject) => {
                form.parse(ctx.req, (err, fields, files) => {
                    if (err) {
                        reject(err)
                    } else {
                        ctx.request.body = Object.assign({}, fields, files);

                        reslove();
                    }
                })
            });
        }

        await next();
    });
}
