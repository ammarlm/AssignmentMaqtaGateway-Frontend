FROM node:14-alpine
RUN npm install -g @angular/cli
USER node
WORKDIR /app
EXPOSE 4200 49153
CMD npm start


