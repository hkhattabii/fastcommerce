FROM node:14-alpine
WORKDIR /app
COPY . .
EXPOSE 5011
ENV ENV=production
ENV PORT=5011
RUN npm install --production
CMD ["npm", "start:prod"]