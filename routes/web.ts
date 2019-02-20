import * as Router from 'koa-router';
import HomeController from '../app/Http/Controllers/HomeController';

const router = new Router();

router.get('/', HomeController.home);

export default router.routes();
