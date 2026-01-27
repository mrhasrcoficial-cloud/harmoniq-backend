FROM node:18

WORKDIR /app

COPY package*.json ./

# Instalar dependencias incluyendo devDependencies
RUN npm install

COPY . .

# Compilar TypeScript
RUN npx tsc -p .

ENV NODE_ENV=production

CMD ["node", "dist/server.js"]