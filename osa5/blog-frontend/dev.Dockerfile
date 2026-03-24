FROM node:24
# start image

WORKDIR "/usr/src/app"

RUN chown -R node:node /usr/src/app

USER node
COPY --chown=node:node . .

RUN npm install


CMD ["npm", "start"]
