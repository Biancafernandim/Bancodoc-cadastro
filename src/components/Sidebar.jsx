import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <h3>Lançamento</h3>
        <ul>
          <li>
            <Link to="/contratos">Contrato</Link>
          </li>
          <li>
            <Link to="/colaboradores/cadastrar">Cadastrar Colaborador</Link>
          </li>
        </ul>
      </div>
      <div className="sidebar-section">
        <h3>Configuração</h3>
        <ul>
          <li>
            <Link to="/clientes">Cliente</Link>
          </li>
          <li>
            <Link to="/fornecedores">Fornecedor</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;