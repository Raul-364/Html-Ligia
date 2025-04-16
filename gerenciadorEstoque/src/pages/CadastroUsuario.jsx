import React from 'react';
import InputField from '../components/InputField';
import Logo from '../components/Logo';

const CadastroUsuario = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de cadastro aqui
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col items-center">
          <Logo />
        </div>
        <h1 className="text-center text-3xl font-bold text-gray-900">Cadastro de Usuário</h1>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <InputField id="nome" name="nome" type="text" placeholder="NOME" />
            <InputField id="email" name="email" type="email" placeholder="E-MAIL" />
            <InputField id="senha" name="senha" type="password" placeholder="SENHA" />
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              ENTRAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastroUsuario;
