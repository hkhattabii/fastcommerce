FROM node:14-alpine
WORKDIR /app
COPY . .
EXPOSE 5015
ENV ENV=production
ENV PORT=5015
RUN npm install --production
CMD ["npm", "run", "start:prod"]
