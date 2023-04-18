#!/bin/bash

# Copy package.json to docker container
docker cp ./package.json postgres_db:/package.json

# Copy /prisma to docker container
docker cp ./prisma postgres_db:/prisma

# Copy .env to docker container
docker cp ./.env postgres_db:/.env

# Apply prisma migration
docker exec -it postgres_db sh -c "apk add --no-cache npm && npm install -g prisma && npx prisma migrate dev --skip-generate"

# Copy any migration changes to local
docker cp postgres_db:/prisma/migrations ./prisma