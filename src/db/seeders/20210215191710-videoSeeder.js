'use strict';
const { uuid } = require('uuidv4');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const aspectRatio1 = await queryInterface.bulkInsert(
            'AspectRatios',
            [
                {
                    name: '4:3',
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                },
            ],
            { returning: ['id'] },
        );
        const aspectRatio2 = await queryInterface.bulkInsert(
            'AspectRatios',
            [
                {
                    name: '16:9',
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                },
            ],
            { returning: ['id'] },
        );

        await queryInterface.bulkInsert(
            'Videos',
            [
                {
                    uuid: uuid(),
                    title: 'Sample mp4 file',
                    description: 'mp4 sample',
                    author: 'Sam',
                    source: 'sample-mp4-file.mp4',
                    duration: 125,
                    aspectRatioId: aspectRatio2,
                    fileExtensionId: await queryInterface.bulkInsert(
                        'FileExtensions',
                        [
                            {
                                name: 'mp4',
                                createdAt: Date.now(),
                                updatedAt: Date.now(),
                            },
                        ],
                        { returning: ['id'] },
                    ),
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                },
                {
                    uuid: uuid(),
                    title: 'Sample avi file',
                    description: 'avi sample',
                    author: 'Sam',
                    source: 'sample-avi-file.avi',
                    duration: 125,
                    aspectRatioId: aspectRatio2,
                    fileExtensionId: await queryInterface.bulkInsert(
                        'FileExtensions',
                        [
                            {
                                name: 'avi',
                                createdAt: Date.now(),
                                updatedAt: Date.now(),
                            },
                        ],
                        { returning: ['id'] },
                    ),
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                },
                {
                    uuid: uuid(),
                    title: 'Sample mov file',
                    description: 'mov sample',
                    author: 'Sam',
                    source: 'sample-mov-file.mov',
                    duration: 125,
                    aspectRatioId: aspectRatio1,
                    fileExtensionId: await queryInterface.bulkInsert(
                        'FileExtensions',
                        [
                            {
                                name: 'mov',
                                createdAt: Date.now(),
                                updatedAt: Date.now(),
                            },
                        ],
                        { returning: ['id'] },
                    ),
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                },
            ],
            {},
        );
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Videos', null, {});
        await queryInterface.bulkDelete('FileExtensions', null, {});
        await queryInterface.bulkDelete('AspectRatios', null, {});
    },
};
