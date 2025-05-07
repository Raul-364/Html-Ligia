import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import authService from '../services/authService';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className={`sidebar fixed h-full bg-black text-white ${isOpen ? 'w-[250px]' : 'w-[60px]'} min-h-screen p-4 transition-all duration-300`}>
      <div className="flex justify-between items-center my-8">
        {isOpen && (
          <div className="w-[60px] h-[60px] border-2 border-black rounded-full flex items-center justify-center">
            <Link to="/">
              <Logo />
            </Link>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded hover:bg-gray-800 transition-colors text-white text-xl bg-transparent border-none focus:outline-none"
        >
          {isOpen ? <FaArrowLeft /> : <FaArrowRight />}
        </button>
      </div>
      {isOpen && (
        <nav className="space-y-2">
          <Link
            to="/produto/cadastro"
            className="block py-2 px-4 rounded hover:bg-gray-800 transition-colors"
          >
            Cadastrar Produto
          </Link>
          <Link
            to="/inventario"
            className="block py-2 px-4 rounded hover:bg-gray-800 transition-colors"
          >
            Inventário
          </Link>
        </nav>
      )}
      {isOpen && (
        <div className="absolute bottom-4 w-[calc(100%-2rem)]">
          <button 
            onClick={handleLogout}
            className="w-full py-2 px-4 rounded hover:bg-gray-800 transition-colors text-left"
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
