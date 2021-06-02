FROM node:14-alpine
WORKDIR /app
COPY . .
EXPOSE 5007
ENV ENV=production
ENV PORT=5007
RUN npm install --production
CMD ["npm", "run", "start:prod"]
