FROM node:16-alpine
WORKDIR /app
ADD package.json .
ADD package-lock.json .
ADD src src
ADD .env .
ADD tsconfig.json .
ADD typegen.json .
ADD schema.graphql .
ADD squid.yaml .
ADD typegen.json .
ADD renovate.json .
ADD Makefile .
ADD LICENSE .
ADD .npmrc .
RUN npm ci
RUN npm run build
EXPOSE 3050
EXPOSE 4350
CMD ["/bin/sh"]
