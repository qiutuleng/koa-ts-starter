import Application from "../interfaces/Application";
import database from './database';

const app = new Application();

database(app);

app.listen(app.config.app.http.port, app.config.app.http.hostname, () => {
    console.log(`Server running on port ${app.config.app.http.hostname}:${app.config.app.http.port}`);
});

export default app;
