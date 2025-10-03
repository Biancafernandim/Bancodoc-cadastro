import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Clientes.css';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState('');
  const [error, setError] = useState('');

  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/clientes');
      setClientes(response.data);
    } catch (err) {
      setError('Não foi possível buscar os clientes.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome) {
      setError('O nome do cliente é obrigatório.');
      return;
    }
    try {
      await axios.post('http://localhost:3001/clientes', { nome });
      setNome('');
      setError('');
      fetchClientes(); // Refresh the list
    } catch (err) {
      setError('Não foi possível criar o cliente.');
      console.error(err);
    }
  };

  return (
    <div className="page-container">
      <h2>Gestão de Clientes</h2>

      <form onSubmit={handleSubmit} className="form-container">
        <h3>Cadastrar Novo Cliente</h3>
        <div className="form-group">
          <label htmlFor="nome">Nome do Cliente:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome do cliente"
          />
        </div>
        <button type="submit">Salvar</button>
        {error && <p className="error-message">{error}</p>}
      </form>

      <div className="list-container">
        <h3>Clientes Cadastrados</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
            </tr>
          </thead>
          <tbody>
            {clientes.length > 0 ? (
              clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.id}</td>
                  <td>{cliente.nome}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">Nenhum cliente cadastrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clientes;