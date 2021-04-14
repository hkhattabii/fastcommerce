FROM node:14-alpine
WORKDIR /app
COPY . .
EXPOSE 5003
ENV ENV=production
ENV PORT=5003
RUN npm install --production
CMD ["npm", "start"]