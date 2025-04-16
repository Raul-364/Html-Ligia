import React from 'react';
import Sidebar from '../components/Sidebar';

const Inventario = () => {
  // Aqui você poderá buscar os dados da API futuramente
  const produtos = [
    {
      id: 1,
      nome: 'Monitor',
      valor: '900.00',
      quantidade: 5,
      descricao: 'Monitor LED 24"',
      fornecedor: 'TechSupply',
    },
    {
      id: 2,
      nome: 'Mouse',
      valor: '40.00',
      quantidade: 20,
      descricao: 'Mouse óptico',
      fornecedor: 'InfoParts',
    },
  ];

  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar />

      <div className="main-content flex-1 ml-[250px] p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-light tracking-wide">INVENTÁRIO</h1>
        </div>

        <div className="table-container overflow-hidden border border-black rounded">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Valor</th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Quantidade</th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Descrição</th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Fornecedor</th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {produtos.map((produto) => (
                <tr key={produto.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{produto.nome}</td>
                  <td className="px-6 py-4 whitespace-nowrap">R$ {produto.valor}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{produto.quantidade}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{produto.descricao}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{produto.fornecedor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Editar | Remover</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventario;
