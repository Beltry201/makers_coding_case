FROM mcr.microsoft.com/devcontainers/typescript-node:20

# Install additional OS packages
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends postgresql-client

# Install global npm packages
RUN npm install -g prisma

WORKDIR /workspace

# Copy package files
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy prisma schema
COPY prisma ./prisma/

# Generate Prisma client
RUN npx prisma generate 