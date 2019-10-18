FROM node

#set working directory
RUN mkdir -p /app/frontend
WORKDIR /app/frontend
COPY frontend/package.json /app/frontend
COPY frontend/package-lock.json /app/frontend

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /app/frontend/node_modules/.bin:$PATH

RUN npm install

# Bundle app source
COPY frontend /app/frontend

EXPOSE 3000

# Environment variables
ENV NODE_ENV production
ENV PORT 3000
ENV PUBLIC_PATH "/"


CMD ["npm", "start"]
