// backend/index.js (Versão 4.0 - Corrigido e com Colaboradores)

const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = 3001;

app.use(express.json());

// --- ROTAS DE CLIENTES ---
/**
 * @route POST /clientes
 * @group Clientes - Operações relacionadas a clientes
 * @param {string} nome.body.required - Nome do cliente
 * @returns {object} 201 - Novo cliente criado
 * @returns {Error}  500 - Erro ao criar o cliente
 */
app.post('/clientes',
  /**
   * Handles the creation of a new client.
   * @param {import('express').Request} req - The Express request object, containing the client's name in the body.
   * @param {import('express').Response} res - The Express response object.
   */
  async (req, res) => {
    try {
      const { nome } = req.body;
      const novoCliente = await prisma.cliente.create({
        data: {
          nome,
        },
      });
      res.status(201).json(novoCliente);
    } catch (error) {
      // Log the error for debugging purposes.
      console.error("Erro ao criar cliente:", error);
      // Return a generic error message to the client.
      res.status(500).json({ error: 'Não foi possível criar o cliente.' });
    }
  }
);

/**
 * @route GET /clientes
 * @group Clientes - Operações relacionadas a clientes
 * @returns {Array.<object>} 200 - Lista de clientes
 * @returns {Error}  500 - Erro ao listar os clientes
 */
app.get('/clientes',
  /**
   * Handles the retrieval of all clients.
   * @param {import('express').Request} req - The Express request object.
   * @param {import('express').Response} res - The Express response object.
   */
  async (req, res) => {
    try {
      const clientes = await prisma.cliente.findMany();
      res.status(200).json(clientes);
    } catch (error) {
      // Log the error for debugging purposes.
      console.error("Erro ao listar clientes:", error);
      // Return a generic error message to the client.
      res.status(500).json({ error: 'Não foi possível listar os clientes.' });
    }
  }
);

// --- ROTAS DE FORNECEDORES ---
/**
 * @route POST /fornecedores
 * @group Fornecedores - Operações relacionadas a fornecedores
 * @param {string} nome.body.required - Nome do fornecedor
 * @param {string} cnpj.body.required - CNPJ do fornecedor
 * @returns {object} 201 - Novo fornecedor criado
 * @returns {Error}  500 - Erro ao criar o fornecedor
 */
app.post('/fornecedores',
  /**
   * Handles the creation of a new supplier.
   * @param {import('express').Request} req - The Express request object, containing the supplier's name and CNPJ in the body.
   * @param {import('express').Response} res - The Express response object.
   */
  async (req, res) => {
    try {
      const { nome, cnpj } = req.body;
      const novoFornecedor = await prisma.fornecedor.create({
        data: {
          nome,
          cnpj,
        },
      });
      res.status(201).json(novoFornecedor);
    } catch (error) {
      // Log the error for debugging purposes.
      console.error("Erro ao criar fornecedor:", error);
      // Return a generic error message to the client.
      res.status(500).json({ error: "Não foi possível criar o fornecedor." });
    }
  }
);

/**
 * @route GET /fornecedores
 * @group Fornecedores - Operações relacionadas a fornecedores
 * @returns {Array.<object>} 200 - Lista de fornecedores
 * @returns {Error}  500 - Erro ao listar os fornecedores
 */
app.get('/fornecedores',
  /**
   * Handles the retrieval of all suppliers.
   * @param {import('express').Request} req - The Express request object.
   * @param {import('express').Response} res - The Express response object.
   */
  async (req, res) => {
    try {
      const fornecedores = await prisma.fornecedor.findMany();
      res.status(200).json(fornecedores);
    } catch (error) {
      // Log the error for debugging purposes.
      console.error("Erro ao listar fornecedores:", error);
      // Return a generic error message to the client.
      res.status(500).json({ error: "Não foi possível listar os fornecedores." });
    }
  }
);

// --- ROTAS DE COLABORADORES ---
/**
 * @route POST /colaboradores
 * @group Colaboradores - Operações relacionadas a colaboradores
 * @param {string} nome.body.required - Nome do colaborador
 * @param {string} cpf.body.required - CPF do colaborador
 * @param {string} dataNascimento.body.required - Data de nascimento do colaborador
 * @param {string} nomeMae.body.required - Nome da mãe do colaborador
 * @param {string} dataAdmissao.body.required - Data de admissão do colaborador
 * @param {number} fornecedorId.body.required - ID do fornecedor ao qual o colaborador está vinculado
 * @returns {object} 201 - Novo colaborador criado
 * @returns {Error}  400 - ID do fornecedor é obrigatório
 * @returns {Error}  409 - CPF já cadastrado
 * @returns {Error}  500 - Erro ao criar o colaborador
 */
app.post('/colaboradores',
  /**
   * Handles the creation of a new collaborator.
   * @param {import('express').Request} req - The Express request object, containing collaborator data in the body.
   * @param {import('express').Response} res - The Express response object.
   */
  async (req, res) => {
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
          fornecedorId,
        },
      });

      res.status(201).json(novoColaborador);

    } catch (error) {
      // Log the error for debugging purposes.
      console.error("Erro ao criar colaborador:", error);
      // Check for a specific database error code for duplicate entries.
      if (error.code === 'P2002' && error.meta?.target?.includes('cpf')) {
        // Return a specific error message if the CPF is already registered.
        return res.status(409).json({ error: 'Este CPF já está cadastrado.' });
      }
      // Return a generic error message for all other errors.
      res.status(500).json({ error: 'Não foi possível criar o colaborador.' });
    }
  }
);

/**
 * @route GET /colaboradores
 * @group Colaboradores - Operações relacionadas a colaboradores
 * @returns {Array.<object>} 200 - Lista de colaboradores
 * @returns {Error}  500 - Erro ao listar os colaboradores
 */
app.get('/colaboradores',
  /**
   * Handles the retrieval of all collaborators.
   * @param {import('express').Request} req - The Express request object.
   * @param {import('express').Response} res - The Express response object.
   */
  async (req, res) => {
    try {
      const colaboradores = await prisma.colaborador.findMany();
      res.status(200).json(colaboradores);
    } catch (error) {
      // Log the error for debugging purposes.
      console.error("Erro ao listar colaboradores:", error);
      // Return a generic error message to the client.
      res.status(500).json({ error: "Não foi possível listar os colaboradores." });
    }
  }
);

// --- ROTAS DE CONTRATOS ---
/**
 * @route POST /contratos
 * @group Contratos - Operações relacionadas a contratos
 * @param {string} numero.body.required - Número do contrato
 * @param {string} dataInicio.body.required - Data de início do contrato (formato ISO 8601)
 * @param {string} dataFim.body.required - Data de fim do contrato (formato ISO 8601)
 * @param {number} clienteId.body.required - ID do cliente
 * @param {number} fornecedorId.body.required - ID do fornecedor
 * @returns {object} 201 - Novo contrato criado
 * @returns {Error}  500 - Erro ao criar o contrato
 */
app.post('/contratos',
  /**
   * Handles the creation of a new contract.
   * @param {import('express').Request} req - The Express request object, containing contract data in the body.
   * @param {import('express').Response} res - The Express response object.
   */
  async (req, res) => {
    try {
      const { numero, dataInicio, dataFim, clienteId, fornecedorId } = req.body;
      const novoContrato = await prisma.contrato.create({
        data: {
          numero,
          dataInicio: new Date(dataInicio),
          dataFim: new Date(dataFim),
          clienteId,
          fornecedorId,
        },
      });
      res.status(201).json(novoContrato);
    } catch (error) {
      // Log the error for debugging purposes.
      console.error("Erro ao criar contrato:", error);
      // Return a generic error message to the client.
      res.status(500).json({ error: 'Não foi possível criar o contrato.' });
    }
  }
);

/**
 * @route GET /contratos
 * @group Contratos - Operações relacionadas a contratos
 * @returns {Array.<object>} 200 - Lista de contratos
 * @returns {Error}  500 - Erro ao listar os contratos
 */
app.get('/contratos',
  /**
   * Handles the retrieval of all contracts.
   * @param {import('express').Request} req - The Express request object.
   * @param {import('express').Response} res - The Express response object.
   */
  async (req, res) => {
    try {
      const contratos = await prisma.contrato.findMany();
      res.status(200).json(contratos);
    } catch (error) {
      // Log the error for debugging purposes.
      console.error("Erro ao listar contratos:", error);
      // Return a generic error message to the client.
      res.status(500).json({ error: "Não foi possível listar os contratos." });
    }
  }
);


/**
 * Starts the Express server and listens for incoming connections on the specified port.
 * @param {number} PORT - The port number to listen on.
 * @param {Function} callback - A callback function that is executed once the server is running.
 */
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});