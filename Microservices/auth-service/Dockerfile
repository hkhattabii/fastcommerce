FROM node:14-alpine
WORKDIR /app
COPY . .
EXPOSE 6001
ENV ENV=production
ENV PORT=6001
ENV SECRET=1t1qw6yb
RUN npm install --production
CMD ["npm", "start"]