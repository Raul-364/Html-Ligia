import React from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar fixed h-full bg-black text-white w-[250px] min-h-screen p-4">
      <div className="flex justify-center mb-8">
        <div className="logo-circle bg-white w-[60px] h-[60px] border-2 border-black rounded-full flex items-center justify-center">
          <Logo small />
        </div>
      </div>
      <nav className="space-y-2">
        <Link
          to="/cadastro"
          className="block py-2 px-4 rounded hover:bg-gray-800 transition-colors"
        >
          Cadastrar Produto
        </Link>
        <Link
          to="/inventario"
          className="block py-2 px-4 rounded bg-gray-800"
        >
          Inventário
        </Link>
      </nav>
      <div className="absolute bottom-4 w-[calc(100%-2rem)]">
        <button className="w-full py-2 px-4 rounded hover:bg-gray-800 transition-colors text-left">
          Sair
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
