FROM node:alpine

WORKDIR /app

COPY ./ /app

RUN yarn install

EXPOSE 5173

CMD ["yarn", "dev"]