import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import productService from '../services/productService';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import { useNavigate } from 'react-router-dom';

const Inventario = () => {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [produtoParaExcluir, setProdutoParaExcluir] = useState(null);

  useEffect(() => {
    carregarProdutos();
  }, []);

  const formatarValor = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const carregarProdutos = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProdutos(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar produtos. Por favor, tente novamente.');
      console.error('Erro ao carregar produtos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoverProduto = async (produto) => {
    setProdutoParaExcluir(produto);
    setModalOpen(true);
  };

  const handleEditarProduto = (produto) => {
    navigate(`/produto/editar/${produto.id}`);
  };

  const confirmarExclusao = async () => {
    try {
      await productService.deleteProduct(produtoParaExcluir.id);
      await carregarProdutos();
      setModalOpen(false);
      setProdutoParaExcluir(null);
    } catch (err) {
      setError('Erro ao remover produto. Por favor, tente novamente.');
      console.error('Erro ao remover produto:', err);
    }
  };

  const cancelarExclusao = () => {
    setModalOpen(false);
    setProdutoParaExcluir(null);
  };

  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar />

      <div className="main-content flex-1 ml-[250px] p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-light tracking-wide">INVENTÁRIO</h1>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-4">Carregando...</div>
        ) : produtos.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-600 text-lg">Nenhum produto cadastrado no momento.</p>
            <p className="text-gray-500 mt-2">Adicione produtos para começar a gerenciar seu inventário.</p>
          </div>
        ) : (
          <div className="table-container overflow-hidden border border-black rounded">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-black text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Preço</th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Quantidade</th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Descrição</th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Fornecedor</th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Marca</th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Tamanho</th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {produtos.map((produto) => (
                  <tr key={produto.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{produto.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatarValor(produto.price)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{produto.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{produto.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{produto.provider || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{produto.brand || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{produto.size || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleEditarProduto(produto)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Editar produto"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleRemoverProduto(produto)}
                          className="text-red-600 hover:text-red-900"
                          title="Remover produto"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <DeleteConfirmationModal
          isOpen={modalOpen}
          onClose={cancelarExclusao}
          onConfirm={confirmarExclusao}
          productName={produtoParaExcluir?.name}
        />
      </div>
    </div>
  );
};

export default Inventario;
