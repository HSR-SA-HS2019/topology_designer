FROM node:carbon

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get -y install autoconf automake libtool nasm make pkg-config git apt-utils

# Versions
RUN npm -v
RUN node -v

#set working directory
RUN mkdir /home/app
WORKDIR /home/app

#install app dependencies
COPY frontend/package.json /home/app
COPY frontend/package-lock.json /home/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
RUN npm install
RUN npm install serve

# Bundle app source
COPY frontend /home/app

#port to listener
EXPOSE 3000

#Environment variables
ENV NODE_ENV production
ENV PORT 3000
ENV PUBLIC_PATH "/"

CMD ["npm", "start"]
