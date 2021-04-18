FROM node:14-alpine
WORKDIR /app
COPY . .
ADD ./init/init.sql /docker-entrypoint-initdb.d/
EXPOSE 5007
ENV ENV=production
ENV PORT=5007
RUN npm install --production
CMD ["npm", "start:prod"]