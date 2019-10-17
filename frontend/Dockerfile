FROM node

WORKDIR /app/frontend
COPY frontend/package.json /app/frontend


RUN npm install

# Bundle app source
COPY . /app/frontend

EXPOSE 3000

# Environment variables
ENV NODE_ENV production
ENV PORT 3000
ENV PUBLIC_PATH "/"

RUN npm run start:build

CMD ["npm", "run", "start:server"]