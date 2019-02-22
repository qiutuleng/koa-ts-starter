import Controller from "../../../interfaces/Controller";

export default class HomeController extends Controller {
    public async home() {
        const {ctx} = this;

        ctx.body = 'Hello World!';
    }
};
