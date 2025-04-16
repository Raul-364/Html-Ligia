import React from 'react';
import InputField from '../components/InputField';
import Logo from '../components/Logo';

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode chamar a lógica de autenticação
    console.log('Login submetido');
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col items-center">
          <Logo />
        </div>
        <h1 className="text-center text-3xl font-bold text-gray-900">Login</h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
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

export default Login;
