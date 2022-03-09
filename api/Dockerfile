FROM node:16
WORKDIR /app/src
COPY package.json /app/src/
COPY build /app/src/
RUN npm install
EXPOSE 8080
CMD ["npm","start"]