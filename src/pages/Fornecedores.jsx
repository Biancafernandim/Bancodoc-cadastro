import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Clientes.css'; // Reusing the same CSS for consistency

const Fornecedores = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [error, setError] = useState('');

  const fetchFornecedores = async () => {
    try {
      const response = await axios.get('http://localhost:3001/fornecedores');
      setFornecedores(response.data);
    } catch (err) {
      setError('Não foi possível buscar os fornecedores.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFornecedores();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome || !cnpj) {
      setError('O nome e o CNPJ do fornecedor são obrigatórios.');
      return;
    }
    try {
      await axios.post('http://localhost:3001/fornecedores', { nome, cnpj });
      setNome('');
      setCnpj('');
      setError('');
      fetchFornecedores(); // Refresh the list
    } catch (err) {
      setError('Não foi possível criar o fornecedor.');
      console.error(err);
    }
  };

  return (
    <div className="page-container">
      <h2>Gestão de Fornecedores</h2>

      <form onSubmit={handleSubmit} className="form-container">
        <h3>Cadastrar Novo Fornecedor</h3>
        <div className="form-group">
          <label htmlFor="nome">Nome do Fornecedor:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome do fornecedor"
          />
        </div>
        <div className="form-group">
          <label htmlFor="cnpj">CNPJ:</label>
          <input
            type="text"
            id="cnpj"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            placeholder="Digite o CNPJ"
          />
        </div>
        <button type="submit">Salvar</button>
        {error && <p className="error-message">{error}</p>}
      </form>

      <div className="list-container">
        <h3>Fornecedores Cadastrados</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>CNPJ</th>
            </tr>
          </thead>
          <tbody>
            {fornecedores.length > 0 ? (
              fornecedores.map((fornecedor) => (
                <tr key={fornecedor.id}>
                  <td>{fornecedor.id}</td>
                  <td>{fornecedor.nome}</td>
                  <td>{fornecedor.cnpj}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">Nenhum fornecedor cadastrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Fornecedores;