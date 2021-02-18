import Router from 'koa-router';
import videosController from './videos.controller';

const router = new Router();

router.get('/videos', videosController.getAllVideos);
router.get('/videos/:uuid', videosController.getVideoById);
router.get('/videos/aspect-ratio/:aspectRatio', videosController.getVideosByAspectRatio);

export default router;
