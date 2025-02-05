# Usa a imagem oficial do Node.js
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos essenciais primeiro para otimizar o cache
COPY package.json package-lock.json ./

# Instala as dependências antes de copiar o restante dos arquivos
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Expõe a porta usada pelo Next.js
EXPOSE 3000

# Comando para iniciar o Next.js
CMD ["npm", "run", "dev"]

