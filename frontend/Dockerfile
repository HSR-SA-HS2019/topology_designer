

FROM node:9.6.1

#set working directory
RUN mkdir /home/app
WORKDIR /home/app
COPY frontend/package.json /home/app
COPY frontend/package-lock.json /home/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
RUN npm install
RUN npm install serve

# Bundle app source
COPY frontend /home/app



EXPOSE 3000

#Environment variables
ENV NODE_ENV production
ENV PORT 3000
ENV PUBLIC_PATH "/"

CMD ["npm", "start"]
