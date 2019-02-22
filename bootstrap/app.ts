import Application from "../interfaces/Application";
import request from './request';
import database from './database';
import controller from "./controller";
import route from "./route";
import service from './service';

const app = new Application();

request(app);
database(app);
service(app);
controller(app);
route(app);

app.listen(app.config.app.http.port, app.config.app.http.hostname, () => {
    console.log(`Server running on port ${app.config.app.http.hostname}:${app.config.app.http.port}`);
});

export default app;
