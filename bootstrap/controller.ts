import Application from "../interfaces/Application";
import * as path from "path";
import * as fs from "fs";
import Service from "../interfaces/Service";
import {Context} from "koa";

export default (app: Application) => {
    const controllersPath = path.resolve('app/Http/Controllers');

    const controllers: { [propName: string]: Service | any } = {};

    const loadControllers = (controllersPath: string, injection: { [propName: string]: any }) => {
        fs.readdirSync(controllersPath)
            .filter((file: string) => file.indexOf('.') !== 0)
            .forEach((file: string) => {
                const filePath: string = `${controllersPath}/${file}`;

                if (fs.lstatSync(filePath).isDirectory()) {
                    injection[file] = {};

                    loadControllers(filePath, injection[file]);
                } else {
                    let controller = require(filePath);

                    if (typeof controller === 'object') {
                        // ES6 module compatibility
                        controller = controller.default;
                    }

                    injection[controller.name] = new Proxy(new controller(app), {
                        get(target: any, key: PropertyKey): any {
                            return (ctx: Context) => {
                                target.setCtx(ctx);
                                target.setServices(ctx.services);
                                target[key]();
                            }
                        }
                    });
                }
            });
    };

    loadControllers(controllersPath, controllers);

    app.controllers = controllers;
}
