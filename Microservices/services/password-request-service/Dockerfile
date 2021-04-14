FROM node:14-alpine
WORKDIR /app
COPY . .
COPY ./init.pgsql /docker-entrypoint-initdb.d/
EXPOSE 5003
ENV ENV=production
ENV PORT=5003
RUN npm install --production
CMD ["npm", "start"]