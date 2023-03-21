FROM node:18.14.2-alpine

WORKDIR /app

# By installing dependencies first, we can cache them in separate Docker layers.
# Dependencies are changed less often than source code, so this will speed up builds.
COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .
COPY ./deployment/entrypoint.sh .

EXPOSE 3001

HEALTHCHECK CMD curl --fail http://0.0.0.0:3001 || exit 1  

ENTRYPOINT ["./entrypoint.sh"]