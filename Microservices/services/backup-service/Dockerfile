FROM node:14-alpine
WORKDIR /app
COPY . .
EXPOSE 5013
ENV ENV=production
ENV PORT=5013
RUN npm install --production
CMD ["npm", "run", "start:prod"]