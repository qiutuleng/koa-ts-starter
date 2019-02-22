import Controller from "../../../interfaces/Controller";

export default class HomeController extends Controller {
    public async home() {
        await this.services.HelloWorld.say();
    }
};
