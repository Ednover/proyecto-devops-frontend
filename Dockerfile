FROM node:20-bullseye

COPY package*.json .

RUN npm install

WORKDIR /app

COPY . /app

#RUN npm test && npm build 

RUN npm build

EXPOSE 5173

ENTRYPOINT ["npm","run", "dev"]
