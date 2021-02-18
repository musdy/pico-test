import bcrypt from 'bcrypt';
import db from '../../../db/models';
import { preparePaginationOptions, preparePaginatedData } from '../../../services/paginate';
const { Video, AspectRatios, FileExtensions } = db;

/**
 * @param username
 * @return {Promise<Model|null>}
 */
async function getVideoById({ uuid }) {
    return Video.findByPk(uuid, { include: [AspectRatios, FileExtensions] });
}

/**
 * @param page
 * @param size
 * @param aspectRatio
 * @return {Promise<{pagination: {limit: *, page: *, total_pages: number, total_items: *}, list: *}>}
 */
async function getAllVideos({ page = 1, size = 5 }) {
    const { count, rows } = await Video.findAndCountAll({
        ...preparePaginationOptions({ page, size }),
    });

    return preparePaginatedData(rows, count, { page, size });
}

/**
 * @param page
 * @param size
 * @param aspectRatio
 * @return {Promise<{pagination: {limit: *, page: *, total_pages: number, total_items: *}, list: *}>}
 */
async function getVideosByAspectRatio({ aspectRatio, page = 1, size = 5 }) {
    const { count, rows } = await Video.findAndCountAll({
        ...preparePaginationOptions({ page, size }),
        include: [
            {
                model: AspectRatios,
                where: { name: aspectRatio },
            },
        ],
    });

    return preparePaginatedData(rows, count, { page, size });
}

export default { getVideoById, getAllVideos, getVideosByAspectRatio };
