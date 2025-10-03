import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Clientes.css'; // Reusing the same CSS for consistency

const CadastrarColaborador = () => {
  const [colaboradores, setColaboradores] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);

  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    dataNascimento: '',
    nomeMae: '',
    dataAdmissao: '',
    fornecedorId: '',
  });

  const [error, setError] = useState('');

  const fetchColaboradores = async () => {
    try {
      const response = await axios.get('http://localhost:3001/colaboradores');
      setColaboradores(response.data);
    } catch (err) {
      setError('Não foi possível buscar os colaboradores.');
      console.error(err);
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
    fetchColaboradores();
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
      await axios.post('http://localhost:3001/colaboradores', {
        ...formData,
        fornecedorId: parseInt(formData.fornecedorId, 10),
      });
      setFormData({
        nome: '',
        cpf: '',
        dataNascimento: '',
        nomeMae: '',
        dataAdmissao: '',
        fornecedorId: '',
      });
      setError('');
      fetchColaboradores(); // Refresh the list
    } catch (err) {
      setError(err.response?.data?.error || 'Não foi possível criar o colaborador.');
      console.error(err);
    }
  };

  return (
    <div className="page-container">
      <h2>Gestão de Colaboradores</h2>

      <form onSubmit={handleSubmit} className="form-container">
        <h3>Cadastrar Novo Colaborador</h3>
        <div className="form-group">
          <label>Nome:</label>
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>CPF:</label>
          <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Data de Nascimento:</label>
          <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Nome da Mãe:</label>
          <input type="text" name="nomeMae" value={formData.nomeMae} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Data de Admissão:</label>
          <input type="date" name="dataAdmissao" value={formData.dataAdmissao} onChange={handleChange} />
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
        <h3>Colaboradores Cadastrados</h3>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Data de Admissão</th>
            </tr>
          </thead>
          <tbody>
            {colaboradores.length > 0 ? (
              colaboradores.map((c) => (
                <tr key={c.id}>
                  <td>{c.nome}</td>
                  <td>{c.cpf}</td>
                  <td>{new Date(c.dataAdmissao).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">Nenhum colaborador cadastrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CadastrarColaborador;