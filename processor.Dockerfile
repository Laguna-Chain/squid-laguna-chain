FROM node:16-alpine
WORKDIR /app
ADD package.json .
ADD package-lock.json .
ADD src src
ADD .env .
ADD tsconfig.json .
ADD typegen.json .
RUN npm ci
RUN npm run build
CMD ["node", "-r", "dotenv/config", "lib/processor.js"]
