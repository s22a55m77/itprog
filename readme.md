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
backend documentation = https://itprog-back.azurewebsites.net/documentation \
front = 

# Naming Convention
## SQL
PK = `PK_<tablename>_<fieldname>` \
FK = `FK_<current tablename>_<fieldname>_<relate tablename>_fieldname`

# Start Project
- make sure that pnpm has already installed
1. install all dependencies
    - `pnpm i`
2. start backend
    - duplicate .env.example and rename it to .env
    - `pnpm --filter=back run watch:dev`
3. start frontend
    - `pnpm --filter=front run start`
