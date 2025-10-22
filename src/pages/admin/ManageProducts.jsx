// src/pages/admin/ManageProducts.jsx - Basic implementation
import React, { useEffect, useState } from 'react';
import productService from '../../services/productService';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({});

    const fetchProducts = async () => {
        setLoading(true);
        try {
            // Admin sees all products (including unavailable ones)
            const data = await productService.getProducts(); 
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (productId) => {
        if (!window.confirm(`Are you sure you want to delete product ${productId}?`)) return;
        try {
            await productService.deleteProduct(productId);
            alert("Product deleted!");
            fetchProducts();
        } catch (error) {
            alert("Failed to delete product. Check console.");
            console.error(error);
        }
    };
    
    // Simple Edit/Create Form logic (requires full implementation)
    const handleEdit = (product) => {
        setCurrentProduct(product);
        setIsEditing(true);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentProduct._id) {
                // Update
                await productService.updateProduct(currentProduct.productId, currentProduct);
                alert("Product updated!");
            } else {
                // Create (needs full form data validation)
                await productService.createProduct(currentProduct);
                alert("Product created!");
            }
            setIsEditing(false);
            setCurrentProduct({});
            fetchProducts();
        } catch (error) {
            alert("Failed to save product. Check console.");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) return <div>Loading products for admin...</div>;

    if (isEditing) {
        return (
            <div>
                <h3>{currentProduct._id ? 'Edit Product' : 'Create New Product'}</h3>
                <form onSubmit={handleFormSubmit} style={{ maxWidth: '400px' }}>
                    <label>Product ID:</label><input name="productId" value={currentProduct.productId || ''} onChange={(e) => setCurrentProduct({...currentProduct, productId: e.target.value})} disabled={!!currentProduct._id} required />
                    <label>Name:</label><input name="name" value={currentProduct.name || ''} onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})} required />
                    <label>Price:</label><input type="number" name="price" value={currentProduct.price || 0} onChange={(e) => setCurrentProduct({...currentProduct, price: parseFloat(e.target.value)})} required />
                    <label>Stock:</label><input type="number" name="stock" value={currentProduct.stock || 0} onChange={(e) => setCurrentProduct({...currentProduct, stock: parseInt(e.target.value)})} required />
                    <label>Is Available:</label><input type="checkbox" name="isAvailable" checked={currentProduct.isAvailable || false} onChange={(e) => setCurrentProduct({...currentProduct, isAvailable: e.target.checked})} style={{ width: 'auto', display: 'inline-block' }} />
                    <button type="submit">Save Product</button>
                    <button type="button" onClick={() => setIsEditing(false)} style={{ background: 'gray' }}>Cancel</button>
                </form>
            </div>
        );
    }

    return (
        <div>
            <h2>Manage Products</h2>
            <button onClick={() => handleEdit({})} style={{ marginBottom: '20px' }}>Add New Product</button>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ccc', padding: '8px' }}>ID</th>
                        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Name</th>
                        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Price</th>
                        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Stock</th>
                        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Available</th>
                        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.productId}>
                            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{product.productId}</td>
                            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{product.name}</td>
                            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{product.price.toFixed(2)}</td>
                            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{product.stock}</td>
                            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{product.isAvailable ? 'Yes' : 'No'}</td>
                            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                <button onClick={() => handleEdit(product)} style={{ background: 'orange' }}>Edit</button>
                                <button onClick={() => handleDelete(product.productId)} style={{ background: 'darkred', marginLeft: '5px' }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageProducts;