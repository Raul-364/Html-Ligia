import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import InputField from '../components/InputField';
import Logo from '../components/Logo';

const CadastroUsuario = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    console.log(formData);
    // Validações
    if (!formData.nome || !formData.email || !formData.senha || !formData.confirmarSenha) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem');
      return;
    }

    if (formData.senha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    try {
      const userData = {
        name: formData.nome,
        email: formData.email,
        password: formData.senha
      };

      console.log('Dados sendo enviados:', userData);
      await register(userData);
    } catch (error) {
      setError(error.message || 'Erro ao cadastrar usuário');
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col items-center">
          <Logo />
        </div>
        <h1 className="text-center text-3xl font-bold text-gray-900">Cadastro de Usuário</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <InputField 
              id="nome" 
              name="nome" 
              type="text" 
              placeholder="NOME" 
              value={formData.nome} 
              onChange={handleChange}
              autoComplete="name"
              required
            />
            <InputField 
              id="email" 
              name="email" 
              type="email" 
              placeholder="E-MAIL" 
              value={formData.email} 
              onChange={handleChange}
              autoComplete="email"
              required
            />
            <InputField 
              id="senha" 
              name="senha" 
              type="password" 
              placeholder="SENHA" 
              value={formData.senha} 
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
            <InputField 
              id="confirmarSenha" 
              name="confirmarSenha" 
              type="password" 
              placeholder="CONFIRMAR SENHA" 
              value={formData.confirmarSenha} 
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              CADASTRAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastroUsuario;
