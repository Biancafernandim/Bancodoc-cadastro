import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>Plataforma</h2>
      </div>
      <ul className="sidebar-menu">
        <li>
          <span>Lançamento</span>
          <ul>
            <li><Link to="/contratos">Contrato</Link></li>
            <li><Link to="/colaboradores/cadastrar">Cadastro colaborador</Link></li>
          </ul>
        </li>
        <li>
          <span>Configuração</span>
          <ul>
            <li><Link to="/clientes">Cliente</Link></li>
            <li><Link to="/fornecedores">Fornecedor</Link></li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;