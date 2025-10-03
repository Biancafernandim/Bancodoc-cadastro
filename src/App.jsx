import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import './App.css';

import Clientes from './pages/Clientes';

import Fornecedores from './pages/Fornecedores';

import CadastrarColaborador from './pages/CadastrarColaborador';

import Contratos from './pages/Contratos';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/contratos" element={<Contratos />} />
            <Route path="/colaboradores/cadastrar" element={<CadastrarColaborador />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/fornecedores" element={<Fornecedores />} />
            <Route path="/" element={<h2>Bem-vindo!</h2>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;