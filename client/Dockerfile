FROM node:20-alpine
WORKDIR /app
ENV CHOKIDAR_USEPOLLING=true
COPY package*.json /app/
RUN ["npm", "install"]
COPY . /app
EXPOSE 4000
ENTRYPOINT ["npm", "run", "dev"]