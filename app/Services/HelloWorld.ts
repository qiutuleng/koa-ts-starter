import Service from "../../interfaces/Service";

export default class HelloWorld extends Service {
    async say(): Promise<any> {
        this.ctx.body = 'Hello, world.';
    }
}
