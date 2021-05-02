FROM node:14-alpine
WORKDIR /app
COPY . .
EXPOSE 5009
ENV ENV=production
ENV PORT=5009
RUN npm install --production
CMD ["npm", "run", "start:prod"]
