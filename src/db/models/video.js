'use strict';
const fs = require('fs');
const { Model } = require('sequelize');
const ffmpeg = require('ffmpeg');

module.exports = (sequelize, DataTypes) => {
    class Video extends Model {}
    Video.init(
        {
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            author: DataTypes.STRING,
            date: DataTypes.DATE,
            duration: DataTypes.INTEGER,
            source: DataTypes.STRING,
            metadata: {
                type: DataTypes.VIRTUAL,
            },
            aspectRatioId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'AspectRatios',
                    key: 'id',
                },
            },
            fileExtensionId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'FileExtensions',
                    key: 'id',
                },
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: sequelize.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: sequelize.NOW,
            },
        },
        {
            sequelize,
            modelName: 'Video',
        },
    );

    Video.addHook('afterFind', async (video) => {
        let metadata = '';
        if (video) {
            try {
                metadata = await new ffmpeg(`${__basedir}/files/${video.source}`).then((video) => {
                    // Here we can store it on redis. If it will get again take it from redis .
                    return video.metadata;
                });
            } catch (err) {
                console.log(err);
            }
            video.metadata = metadata;

            return video;
        }

        return null;
    });
    return Video;
};
