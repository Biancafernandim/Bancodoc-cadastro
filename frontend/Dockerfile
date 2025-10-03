# frontend/Dockerfile

# 1. Ponto de Partida: Também usamos o Node.js como base, pois ele é necessário para
# construir e rodar o ambiente de desenvolvimento do React.
FROM node:20-alpine

# 2. Diretório de Trabalho:
WORKDIR /app

# 3. Instalação das Dependências: Mesma lógica do backend.
# Copia a lista de "peças" do frontend.
COPY package*.json ./
# Instala as peças.
RUN npm install

# 4. Copiando o Código-Fonte:
COPY . .

# 5. Comando Final:
# 'npm run dev' aqui irá iniciar o servidor de desenvolvimento do Vite (React).
CMD ["npm", "run", "dev"]