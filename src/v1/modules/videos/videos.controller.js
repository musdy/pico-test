import ResponseProducer from '../../../services/responseProducer';
import VideosService from './videos.service';

/**
 * @param ctx
 * @return {Promise<*|{status: string, code: string, message: string, data: Object}>}
 */
async function getVideoById(ctx) {
    const { uuid } = ctx.request.params;

    const video = await VideosService.getVideoById({ uuid });
    if (!video) {
        return ResponseProducer.customCode(ctx, 404, { message: 'Video not found' });
    }

    return ResponseProducer.success(ctx, { data: video });
}

/**
 * @param ctx
 * @return {Promise<*|{status: string, code: string, message: string, data: Object}>}
 */
async function getAllVideos(ctx) {
    const { page, size } = ctx.request.query;

    try {
        const { data, pagination } = await VideosService.getAllVideos({ page, size });

        return ResponseProducer.success(ctx, { data, pagination });
    } catch (err) {
        console.log(err);
        return ResponseProducer.error(ctx, { message: 'There is an error while listing videos.', data: null });
    }
}

/**
 * @param ctx
 * @return {Promise<{status: string, code: string, message: string, data: Object}>}
 */
async function getVideosByAspectRatio(ctx) {
    const { page, size } = ctx.request.query;
    const { aspectRatio } = ctx.request.params;

    if (!aspectRatio) {
        return ResponseProducer.badRequest(ctx, { message: 'You should provide aspect ratio' });
    }

    console.log({ page, size });
    try {
        const { data, pagination } = await VideosService.getVideosByAspectRatio({ aspectRatio, page, size });

        return ResponseProducer.success(ctx, { data, pagination });
    } catch (err) {
        console.log(err);
        return ResponseProducer.error(ctx, { message: 'There is an error while listing videos.', data: null });
    }
}

export default { getVideoById, getAllVideos, getVideosByAspectRatio };
