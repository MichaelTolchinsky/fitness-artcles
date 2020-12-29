FROM node:14.15.3-alpine3.11

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4000

ENV MONGODB_USERNAME=root
ENV MONGODB_PASSWORD=secret
ENV MONGODB_URL=mongodb
ENV MONGODB_NAME=artcles-dev

CMD ["npm","start"]