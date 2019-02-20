import {Context} from "koa";

export default {
    home(ctx: Context) {
        ctx.body = 'Hello World!';
    }
};
