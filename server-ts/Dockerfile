FROM node:alpine

#RUN yarn global add nodemon

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 3000

#CMD ["yarn", "dev"]

CMD ["node", "dist/index.js"]