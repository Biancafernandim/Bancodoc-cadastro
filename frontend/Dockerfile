# frontend/Dockerfile (Documentado)

# Etapa 1: Imagem Base
# Usamos a imagem oficial do Node.js na versão 20, baseada no Alpine Linux.
# O Node.js é necessário para construir o projeto React com Vite.
FROM node:20-alpine

# Etapa 2: Diretório de Trabalho
# Define o diretório de trabalho dentro do container como '/app'.
WORKDIR /app

# Etapa 3: Instalação de Dependências
# Copia os arquivos `package.json` and `package-lock.json`.
# Fazer isso separadamente aproveita o cache do Docker. Se o `package.json` não mudar,
# o Docker não reinstalará as dependências em builds subsequentes.
COPY package*.json ./

# Instala as dependências do projeto listadas no `package.json`.
RUN npm install

# Etapa 4: Copiando o Código-Fonte
# Copia o restante do código-fonte da aplicação para o diretório '/app'.
COPY . .

# Etapa 5: Comando de Execução
# Define o comando padrão para iniciar o servidor de desenvolvimento do Vite.
# O Vite irá servir a aplicação React e fornecer HMR (Hot Module Replacement).
CMD ["npm", "run", "dev"]