FROM node:18.14.2-alpine
COPY . /home/app
WORKDIR /home/app
COPY entrypoint.sh .
COPY package.json ./
RUN yarn add bcrypt 
RUN yarn install
EXPOSE 3001
CMD ["./entrypoint.sh"]