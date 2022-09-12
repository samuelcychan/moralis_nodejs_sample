FROM node:alpine

WORKDIR /src/app
COPY package*.json ./
RUN npm install
COPY . .
# RUN npm ci --only=production
EXPOSE 8080
CMD ["npm", "run", "start"]