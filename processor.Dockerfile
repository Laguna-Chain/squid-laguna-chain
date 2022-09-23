FROM node:16-alpine
WORKDIR /app
ADD src src
ADD db db
ADD assets assets
ADD package.json .
ADD package-lock.json .
ADD .env .
ADD tsconfig.json .
ADD typegen.json .
ADD schema.graphql .
ADD squid.yaml .
ADD typegen.json .
RUN npm ci
RUN npm run build
EXPOSE 3050
EXPOSE 4350
CMD ["/bin/sh"]
