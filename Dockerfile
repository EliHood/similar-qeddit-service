FROM node:16.15-alpine3.14
COPY . /home/app
WORKDIR /home/app
COPY entrypoint.sh .
RUN yarn add bcrypt 
COPY package.json ./
RUN yarn install
EXPOSE 5000
CMD ["./entrypoint.sh"]