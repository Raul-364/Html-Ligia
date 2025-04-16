document.addEventListener('DOMContentLoaded', function () {
    // Check authentication
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'index.html';
        return;
    }

    // Handle logout
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', function () {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        window.location.href = 'index.html';
    });

    // Get products from localStorage
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Function to render products
    function renderProducts() {
        const tableBody = document.getElementById('productTableBody');
        tableBody.innerHTML = '';

        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    ${product.name}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    R$ ${parseFloat(product.price).toFixed(2)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    ${product.quantity}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    ${product.description || '-'}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    ${product.supplier || '-'}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <button onclick="editProduct(${product.id})" class="text-black hover:text-gray-600">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                    </button>
                    <button onclick="deleteProduct(${product.id})" class="text-red-600 hover:text-red-800">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Update total value
        const totalValue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
        localStorage.setItem('totalValue', totalValue.toFixed(2));
    }

    // Delete product function
    window.deleteProduct = function (productId) {
        if (confirm('Tem certeza que deseja excluir este produto?')) {
            products = products.filter(p => p.id !== productId);
            localStorage.setItem('products', JSON.stringify(products));
            renderProducts();
        }
    };

    // Edit product function
    window.editProduct = function (productId) {
        localStorage.setItem('editProductId', productId);
        window.location.href = 'product-register.html';
    };

    // Initial render
    renderProducts();
});
