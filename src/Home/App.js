import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ListaPecas from '../ListaPecas/App.js';
import Produtos from '../Produtos/App.js';
import Pecas from '../Pecas/App.js';

const App = () => {
  return (
    <div className="App">
      <div className="text-uppercase ">
        <Router >
          <Link to="/src/produtos"    className="p-3 mt-0">Produtos</Link>
          <Link to="/src/Pecas"       className="p-3 mt-0">Pecas</Link>
          <Link to="/src/ListaPecas"  className="p-3 mt-0">ListaPecas</Link>
          <Routes>
            <Route path="/src/Produtos"   element={<Produtos/>} />
            <Route path="/src/Pecas"      element={<Pecas/>} />
            <Route path="/src/ListaPecas" element={<ListaPecas/>} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}
 
export default App;
