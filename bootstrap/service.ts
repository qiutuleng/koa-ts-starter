import Application from "../interfaces/Application";
import * as path from "path";
import * as fs from "fs";
import Service from "../interfaces/Service";
import {Context} from "koa";

export default (app: Application) => {
    const servicesPath = path.resolve('app/Services');

    const services: { [propName: string]: Service | any } = {};

    const loadServices = (servicesPath: string, injection: { [propName: string]: any }) => {
        fs.readdirSync(servicesPath)
            .filter((file: string) => file.indexOf('.') !== 0)
            .forEach((file: string) => {
                let filePath: string = `${servicesPath}/${file}`;

                if (fs.lstatSync(filePath).isDirectory()) {
                    injection[file] = {};

                    loadServices(filePath, injection[file]);
                } else {
                    let service = require(filePath);

                    if (typeof service === 'object') {
                        // ES6 module compatibility
                        service = service.default;
                    }

                    injection[service.name] = new service(app);
                }
            });
    };

    loadServices(servicesPath, services);

    app.services = services;

    const injectionContextToService = (service: Service | { [propName: string]: any }, ctx: Context) => {
        if (service instanceof Service) {
            service.setCtx(ctx);
        } else {
            Object.keys(service).forEach(serviceName => {
                injectionContextToService(service[serviceName], ctx);
            });
        }
    };

    app.use(async (ctx, next) => {
        ctx.services = services;

        injectionContextToService(ctx.services, ctx);

        await next();
    });
}
