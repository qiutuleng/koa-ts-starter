import Application from "../interfaces/Application";

export default (app: Application) => {
    const {controllers, router} = app;

    router.get('/', controllers.HomeController.home);
}
