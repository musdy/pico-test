FROM node:14 as base
ENV NODE_ENV=production

EXPOSE 80

WORKDIR /app
COPY package*.json ./
RUN npm install --only=production \
    && npm cache clean --force
ENV PATH /app/node_modules/.bin:$PATH

FROM base as dev
ENV NODE_ENV=development
RUN npm install --only=development
CMD ["/app/node_modules/.bin/nodemon"]

FROM dev as build
COPY . .

FROM base as prod
RUN npm install pm2 -g
COPY --from=build /app .
CMD ["pm2-runtime", "ecosystem.config.cjs"]