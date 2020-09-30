FROM node:12 as BUILDER
RUN mkdir /app
WORKDIR /app

RUN apt-get update
RUN apt install python python3 binutils cmake make libglib2.0-dev gcc g++ -y
COPY package*.json /app/
RUN npm install

COPY . /app

ARG env=prod
RUN npm run build -- --mode=$env --unsafe-perm


FROM nginx:1-alpine as app
COPY --from=BUILDER /app/build/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
