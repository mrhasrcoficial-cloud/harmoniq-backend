FROM node:18

# 1. País Backend
WORKDIR /app

# 2. Copiar solo package.json + package-lock.json
COPY package*.json ./

# 3. Instalar dependencias (incluye TypeScript)
RUN npm install

# 4. Copiar el resto del código
COPY . .

# 5. Compilar TypeScript desde el punto oficial (tsconfig ya lo sabe)
RUN npx tsc -p .

# 6. Modo producción
ENV NODE_ENV=production

# 7. Ejecutar el servidor soberano
CMD ["node", "dist/server.js"]