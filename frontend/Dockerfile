

FROM node:9.6.1

#set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY frontend/package.json /usr/src/app
COPY frontend/package-lock.json /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
RUN npm install
RUN npm install serve

# Bundle app source
COPY frontend /usr/src/app



EXPOSE 3000

#Environment variables
ENV NODE_ENV production
ENV PORT 3000
ENV PUBLIC_PATH "/"

chown -R $USER:$USER '/home/root/.npm/'

CMD ["npm", "start"]
