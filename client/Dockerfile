FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm install -g @angular/cli
RUN npm install

EXPOSE 4200

CMD ["npm", "start"]
