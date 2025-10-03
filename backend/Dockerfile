# backend/Dockerfile (Versão Corrigida)

# 1. Ponto de Partida: Usaremos uma imagem oficial do Node.js (versão 18) como base.
FROM node:18-alpine

# 2. Diretório de Trabalho: Cria uma pasta chamada '/app' dentro do container.
WORKDIR /app

# 3. Copiando o Código-Fonte PRIMEIRO
# Copiamos tudo (package.json, prisma/, index.js, etc.) para dentro do container.
COPY . .

# 4. Instalando as Dependências DEPOIS
# Agora, quando 'npm install' rodar, o script 'postinstall' (que executa 'prisma generate')
# vai conseguir encontrar a pasta /prisma e o arquivo schema.prisma.
RUN npm install

# 5. Comando Final:
# O comando que será executado quando o container iniciar.
CMD ["npm", "run", "dev"]