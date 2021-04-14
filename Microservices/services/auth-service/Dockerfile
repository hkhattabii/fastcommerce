FROM node:14-alpine
WORKDIR /app
COPY . .
EXPOSE 5001
ENV ENV=production
ENV PORT=5001
ENV SECRET=1t1qw6yb
RUN npm install --production
CMD ["npm", "start"]