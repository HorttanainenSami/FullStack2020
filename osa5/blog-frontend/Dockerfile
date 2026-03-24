from node:24 As build-stage

WORKDIR "/usr/src/app"

COPY . .

RUN npm ci

RUN npm run build

#test
FROM build-stage AS test-stage
RUN npm test


FROM nginx:1.29

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html