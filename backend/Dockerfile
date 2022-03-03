FROM node:14-alpine

RUN npm install -g nodemon

ADD package.json package-lock.json ./

RUN npm install

ADD bin ./bin
ADD src ./src

CMD [ "nodemon" ]
