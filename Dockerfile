FROM node:20-bullseye

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . /app

RUN npm build || true

EXPOSE 5173

ENTRYPOINT ["npm","run", "dev"]
