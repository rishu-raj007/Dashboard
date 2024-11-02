FROM node:22-alpine

WORKDIR /dashboard

COPY package*.json ./

RUN npm install

COPY . .


EXPOSE 3000

CMD ["npm", "start"]