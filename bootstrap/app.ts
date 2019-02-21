import Application from "../interfaces/Application";
import database from './database';
import service from './service';

const app = new Application();

database(app);
service(app);

app.listen(app.config.app.http.port, app.config.app.http.hostname, () => {
    console.log(`Server running on port ${app.config.app.http.hostname}:${app.config.app.http.port}`);
});

export default app;
