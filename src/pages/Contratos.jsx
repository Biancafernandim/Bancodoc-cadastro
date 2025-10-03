import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Clientes.css'; // Reusing the same CSS for consistency

const Contratos = () => {
  const [contratos, setContratos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);

  const [formData, setFormData] = useState({
    numero: '',
    dataInicio: '',
    dataFim: '',
    clienteId: '',
    fornecedorId: '',
  });

  const [error, setError] = useState('');

  const fetchContratos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/contratos');
      setContratos(response.data);
    } catch (err) {
      setError('Não foi possível buscar os contratos.');
      console.error(err);
    }
  };

  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/clientes');
      setClientes(response.data);
    } catch (err) {
      console.error('Erro ao buscar clientes:', err);
    }
  };

  const fetchFornecedores = async () => {
    try {
      const response = await axios.get('http://localhost:3001/fornecedores');
      setFornecedores(response.data);
    } catch (err) {
      console.error('Erro ao buscar fornecedores:', err);
    }
  };

  useEffect(() => {
    fetchContratos();
    fetchClientes();
    fetchFornecedores();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const key in formData) {
      if (!formData[key]) {
        setError(`O campo ${key} é obrigatório.`);
        return;
      }
    }

    try {
      await axios.post('http://localhost:3001/contratos', {
        ...formData,
        clienteId: parseInt(formData.clienteId, 10),
        fornecedorId: parseInt(formData.fornecedorId, 10),
      });
      setFormData({
        numero: '',
        dataInicio: '',
        dataFim: '',
        clienteId: '',
        fornecedorId: '',
      });
      setError('');
      fetchContratos(); // Refresh the list
    } catch (err) {
      setError(err.response?.data?.error || 'Não foi possível criar o contrato.');
      console.error(err);
    }
  };

  return (
    <div className="page-container">
      <h2>Gestão de Contratos</h2>

      <form onSubmit={handleSubmit} className="form-container">
        <h3>Cadastrar Novo Contrato</h3>
        <div className="form-group">
          <label>Número do Contrato:</label>
          <input type="text" name="numero" value={formData.numero} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Data de Início:</label>
          <input type="date" name="dataInicio" value={formData.dataInicio} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Data de Fim:</label>
          <input type="date" name="dataFim" value={formData.dataFim} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Cliente:</label>
          <select name="clienteId" value={formData.clienteId} onChange={handleChange}>
            <option value="">Selecione um Cliente</option>
            {clientes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Fornecedor:</label>
          <select name="fornecedorId" value={formData.fornecedorId} onChange={handleChange}>
            <option value="">Selecione um Fornecedor</option>
            {fornecedores.map((f) => (
              <option key={f.id} value={f.id}>
                {f.nome}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Salvar</button>
        {error && <p className="error-message">{error}</p>}
      </form>

      <div className="list-container">
        <h3>Contratos Cadastrados</h3>
        <table>
          <thead>
            <tr>
              <th>Número</th>
              <th>Cliente</th>
              <th>Fornecedor</th>
              <th>Início</th>
              <th>Fim</th>
            </tr>
          </thead>
          <tbody>
            {contratos.length > 0 ? (
              contratos.map((c) => (
                <tr key={c.id}>
                  <td>{c.numero}</td>
                  <td>{clientes.find(cl => cl.id === c.clienteId)?.nome || 'N/A'}</td>
                  <td>{fornecedores.find(f => f.id === c.fornecedorId)?.nome || 'N/A'}</td>
                  <td>{new Date(c.dataInicio).toLocaleDateString()}</td>
                  <td>{new Date(c.dataFim).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Nenhum contrato cadastrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contratos;