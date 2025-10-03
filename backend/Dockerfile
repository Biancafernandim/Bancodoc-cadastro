# backend/Dockerfile (Versão Corrigida e Documentada)

# Etapa 1: Imagem Base
# Usamos a imagem oficial do Node.js na versão 18, baseada no Alpine Linux.
# Alpine é uma distribuição Linux leve, o que resulta em imagens Docker menores.
FROM node:18-alpine

# Etapa 2: Diretório de Trabalho
# Define o diretório de trabalho dentro do container como '/app'.
# Todos os comandos subsequentes serão executados a partir deste diretório.
WORKDIR /app

# Etapa 3: Copiando o Código-Fonte
# Copia todos os arquivos do diretório atual (onde o Dockerfile está) para o diretório '/app' no container.
# Isso inclui package.json, prisma/, index.js, etc.
COPY . .

# Etapa 4: Instalando as Dependências
# Executa 'npm install' para instalar todas as dependências definidas no package.json.
# O script 'postinstall' (que executa 'prisma generate') será acionado,
# gerando o Prisma Client com base no schema.prisma.
RUN npm install

# Etapa 5: Comando de Execução
# Define o comando padrão que será executado quando o container for iniciado.
# 'npm run dev' normalmente inicia o servidor de desenvolvimento com hot-reloading (via nodemon).
CMD ["npm", "run", "dev"]