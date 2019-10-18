FROM node

RUN mkdir -p /app/frontend
WORKDIR /app/frontend
COPY frontend/package.json /app/frontend
COPY frontend/package-lock.json /app/frontend

RUN npm install

# Bundle app source
COPY . /app/frontend

EXPOSE 3000

# Environment variables
ENV NODE_ENV production
ENV PORT 3000
ENV PUBLIC_PATH "/"


CMD ["npm", "start"]
