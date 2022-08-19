FROM node:alpine
WORKDIR /usr/src/app
COPY ./package*.json ./

# ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --omit=dev; \
    fi
COPY . .
RUN chown node:node -R ./
USER node
ENV PORT 3000
EXPOSE ${PORT}
CMD [ "npm", "run", "start" ]