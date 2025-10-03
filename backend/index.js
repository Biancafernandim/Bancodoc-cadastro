// backend/index.js (Versão 4.0 - Corrigido e com Colaboradores)

const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = 3001;

app.use(express.json());

// --- ROTAS DE CLIENTES ---
app.post('/clientes', async (req, res) => {
  try {
    const { nome } = req.body;
    const novoCliente = await prisma.cliente.create({
      data: {
        nome, // CORRIGIDO: Passando a variável 'nome', e não o tipo 'String'
      },
    });
    res.status(201).json(novoCliente);
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    res.status(500).json({ error: 'Não foi possível criar o cliente.' });
  }
});

app.get('/clientes', async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany();
    res.status(200).json(clientes);
  } catch (error) {
    console.error("Erro ao listar clientes:", error);
    res.status(500).json({ error: 'Não foi possível listar os clientes.' });
  }
});

// --- ROTAS DE FORNECEDORES ---
app.post('/fornecedores', async (req, res) => {
  try {
    const { nome, cnpj } = req.body;
    const novoFornecedor = await prisma.fornecedor.create({
      data: {
        nome, // CORRIGIDO
        cnpj, // CORRIGIDO
      },
    });
    res.status(201).json(novoFornecedor);
  } catch (error) {
    console.error("Erro ao criar fornecedor:", error);
    res.status(500).json({ error: "Não foi possível criar o fornecedor." });
  }
});

app.get('/fornecedores', async (req, res) => {
  try {
    const fornecedores = await prisma.fornecedor.findMany();
    res.status(200).json(fornecedores);
  } catch (error) {
    console.error("Erro ao listar fornecedores:", error);
    res.status(500).json({ error: "Não foi possível listar os fornecedores." });
  }
});

// --- ROTAS DE COLABORADORES ---
app.post('/colaboradores', async (req, res) => {
    try {
      const { nome, cpf, dataNascimento, nomeMae, dataAdmissao, fornecedorId } = req.body;

      if (!fornecedorId) {
        return res.status(400).json({ error: 'O ID do fornecedor (fornecedorId) é obrigatório.' });
      }

      const novoColaborador = await prisma.colaborador.create({
        data: {
          nome,
          cpf,
          dataNascimento: new Date(dataNascimento),
          nomeMae,
          dataAdmissao: new Date(dataAdmissao),
          fornecedorId, // Ligação correta com o fornecedor
        },
      });

      res.status(201).json(novoColaborador);

    } catch (error) {
      console.error("Erro ao criar colaborador:", error);
      if (error.code === 'P2002' && error.meta?.target?.includes('cpf')) {
        return res.status(409).json({ error: 'Este CPF já está cadastrado.' });
      }
      res.status(500).json({ error: 'Não foi possível criar o colaborador.' });
    }
  });

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});