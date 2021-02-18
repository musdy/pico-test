/**
 * @param data
 * @param totalItemCount
 * @param page
 * @param limit
 * @return {{pagination: {limit: *, page: *, total_pages: number, total_items: *}, list: *}}
 */
export function preparePaginatedData(data, totalItemCount, { page, size }) {
    return {
        data,
        pagination: {
            page: page,
            limit: +size,
            totalItems: totalItemCount,
            totalPages: Math.ceil(totalItemCount / +size),
        },
    };
}

/**
 * @param page
 * @param limit
 * @return {{offset: number, limit: (*|number)}}
 */
export function preparePaginationOptions({ page, size }) {
    return {
        limit: +size,
        offset: page - 1 !== 0 ? (page - 1) * +size : 0,
    };
}
