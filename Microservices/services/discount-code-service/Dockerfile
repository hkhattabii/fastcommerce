FROM node:14-alpine
WORKDIR /app
COPY . .
ADD ./init/init.sql /docker-entrypoint-initdb.d/
EXPOSE 5009
ENV ENV=production
ENV PORT=5009
RUN npm install --production
CMD ["npm", "run", "dev"]
