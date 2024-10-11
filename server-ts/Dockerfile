FROM node:alpine

WORKDIR /app

COPY ./ /app

RUN yarn install

EXPOSE 3000

CMD ["node", "dist/index.js"]