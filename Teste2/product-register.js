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

    const productForm = document.getElementById('productForm');
    const addButton = document.getElementById('addButton');
    const updateButton = document.getElementById('updateButton');
    const deleteButton = document.getElementById('deleteButton');
    const viewButton = document.getElementById('viewButton');
    const totalValueElement = document.getElementById('totalValue');

    let editingProductId = localStorage.getItem('editProductId');

    // Update total value display
    function updateTotalValue() {
        const totalValue = localStorage.getItem('totalValue') || '0.00';
        totalValueElement.textContent = `R$ ${totalValue}`;
    }

    // Load product data if editing
    if (editingProductId) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const product = products.find(p => p.id === parseInt(editingProductId));

        if (product) {
            document.getElementById('productName').value = product.name;
            document.getElementById('price').value = product.price;
            document.getElementById('quantity').value = product.quantity;
            document.getElementById('description').value = product.description || '';
            document.getElementById('supplier').value = product.supplier || '';
        }
    }

    // Add product function
    addButton.addEventListener('click', function () {
        const productData = {
            name: document.getElementById('productName').value,
            price: parseFloat(document.getElementById('price').value),
            quantity: parseInt(document.getElementById('quantity').value),
            description: document.getElementById('description').value,
            supplier: document.getElementById('supplier').value,
            id: Date.now()
        };

        // Validate form data
        if (!productData.name || isNaN(productData.price) || isNaN(productData.quantity)) {
            alert('Por favor, preencha todos os campos obrigatórios corretamente.');
            return;
        }

        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(productData);
        localStorage.setItem('products', JSON.stringify(products));

        // Update total value
        const totalValue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
        localStorage.setItem('totalValue', totalValue.toFixed(2));
        updateTotalValue();

        alert('Produto adicionado com sucesso!');
        productForm.reset();
    });

    // Update product function
    updateButton.addEventListener('click', function () {
        if (!editingProductId) {
            alert('Selecione um produto para atualizar.');
            return;
        }

        const productData = {
            name: document.getElementById('productName').value,
            price: parseFloat(document.getElementById('price').value),
            quantity: parseInt(document.getElementById('quantity').value),
            description: document.getElementById('description').value,
            supplier: document.getElementById('supplier').value,
            id: parseInt(editingProductId)
        };

        // Validate form data
        if (!productData.name || isNaN(productData.price) || isNaN(productData.quantity)) {
            alert('Por favor, preencha todos os campos obrigatórios corretamente.');
            return;
        }

        let products = JSON.parse(localStorage.getItem('products')) || [];
        const index = products.findIndex(p => p.id === parseInt(editingProductId));

        if (index !== -1) {
            products[index] = productData;
            localStorage.setItem('products', JSON.stringify(products));

            // Update total value
            const totalValue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
            localStorage.setItem('totalValue', totalValue.toFixed(2));
            updateTotalValue();

            alert('Produto atualizado com sucesso!');
            window.location.href = 'inventory.html';
        }
    });

    // Delete product function
    deleteButton.addEventListener('click', function () {
        if (!editingProductId) {
            alert('Selecione um produto para deletar.');
            return;
        }

        if (confirm('Tem certeza que deseja excluir este produto?')) {
            let products = JSON.parse(localStorage.getItem('products')) || [];
            products = products.filter(p => p.id !== parseInt(editingProductId));
            localStorage.setItem('products', JSON.stringify(products));

            // Update total value
            const totalValue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
            localStorage.setItem('totalValue', totalValue.toFixed(2));

            alert('Produto deletado com sucesso!');
            window.location.href = 'inventory.html';
        }
    });

    // View product function
    viewButton.addEventListener('click', function () {
        window.location.href = 'inventory.html';
    });

    // Initial total value update
    updateTotalValue();
});
