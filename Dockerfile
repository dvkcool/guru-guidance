FROM ibmcom/ibmnode
# React commands
RUN apt-get update && apt-get install -y build-essential python

#Install deps
RUN mkdir /app
COPY app/package.json /app/package.json
RUN cd /app && npm install

#Add all source code
ADD app /app/
RUN cd /app && npm run build
RUN npm -g install serve

WORKDIR /app

#Default command
CMD ["serve", "-s", "build", "-p", "8081"]
WORKDIR /../
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install

EXPOSE 8080

COPY . /usr/src/app

CMD ["node", "app.js"]
