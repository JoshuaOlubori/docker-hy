FROM ubuntu:22.04
RUN apt update && apt install -y curl
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash && apt install -y nodejs
EXPOSE 5000
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g serve
COPY . .
RUN npm run build
CMD ["serve", "-s", "-l", "5000","dist"]



