# MySQL Connection
hostname=itprog.mysql.database.azure.com \
port=3306 \
username=itprog \
password=DLSU1234!

# LINKS
## local
backend = http://localhost:3001/ \
backend documentation = http://localhost:3001/documentation/ \
front = http://localhost:3000/
## azure
- everything push to github will be automatically deployed to azure

backend = https://itprog-back.azurewebsites.net/ \
backend documentation = https://itprog-back.azurewebsites.net/documentation/ \
front = https://itprog-front.azurewebsites.net/
phase2 = https://itprog-phase2.azurewebsites.net/

# Naming Convention
## SQL
PK = `PK_<tablename>_<fieldname>` \
FK = `FK_<current tablename>_<fieldname>_<relate tablename>_fieldname`

# Start Project
## using nodejs
1. install nodejs and pnpm
    - https://nodejs.org/dist/v16.20.0/
      - download and install it
    - `npm install -g pnpm`
      - run this command after installed the nodejs
2. install all dependencies
    - `pnpm i`
3. start backend
    - make sure that the cmd is in in the root folder of the project
    - duplicate .env.example and rename it to .env
    - `pnpm --filter=back run watch:dev`
4. start frontend
    - change the url in apps/front/src/services/api.js to the url of the backend in localhost
    - `pnpm --filter=front run start`
5. start php
    - copy the apps/php file to the xampp folder or add a soft link

##  using docker
1. backend
    - go to into the apps/back folder
    - `docker build . -t back`
    - run it using docker desktop
2. frontend
    - go to into the apps/front folder
    - `docker build . -t front`
    - run it using docker desktop
3. php
    -  go to into the apps/php folder
    - `docker build . -t php`
    - run it using docker desktop
