import React, { useState, useEffect } from 'react';
import { getAllProducts, deleteProduct, createProduct,updateProduct } from '../../services/productService.js';

function EditModal({ product, onClose, onSave }) {
  const [formData, setFormData] = useState(product);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fadeIn">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-2xl transition-transform transform scale-100">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Product: {product.name}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product ID</label>
            <input name="productId" value={formData.productId} readOnly disabled className="p-2 border rounded w-full bg-gray-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" required className="p-2 border rounded w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input name="price" value={formData.price} onChange={handleChange} type="number" step="0.01" placeholder="Price" required className="p-2 border rounded w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Labelled Price</label>
            <input name="labelledPrice" value={formData.labelledPrice} onChange={handleChange} type="number" step="0.01" placeholder="Labelled Price" required className="p-2 border rounded w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Stock</label>
            <input name="stock" value={formData.stock} onChange={handleChange} type="number" placeholder="Stock" required className="p-2 border rounded w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" required className="p-2 border rounded w-full" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input 
              name="image" 
              value={Array.isArray(formData.image) ? formData.image[0] : formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: [e.target.value] }))}
              placeholder="Image URL" 
              className="p-2 border rounded w-full" 
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required rows="3" className="p-2 border rounded w-full" />
          </div>
          <div className="md:col-span-2 flex justify-end gap-4 mt-4">
            <button type="button" onClick={onClose} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition">
              Cancel
            </button>
            <button type="submit" className="bg-linear-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [newProduct, setNewProduct] = useState({
      productId: '', name: '', price: 0, labelledPrice: 0, 
      description: '', stock: 0, category: 'cosmetics', image: '',
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getAllProducts();
      setProducts(response.data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
        alert('Product deleted successfully');
        fetchProducts(); 
      } catch (err) {
        console.error(err);
        alert('Failed to delete product.');
      }
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleUpdateSave = async (updatedProduct) => {
    try {
      await updateProduct(updatedProduct.productId, updatedProduct);
      alert('Product updated successfully!');
      handleModalClose();
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert('Failed to update product.');
    }
  };

  const handleCreateFormChange = (e) => {
    const { name, value, type } = e.target;
    setNewProduct(prev => ({
        ...prev,
        [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleCreateSubmit = async (e) => {
      e.preventDefault();
      const productData = { ...newProduct, image: newProduct.image ? [newProduct.image] : undefined };
      try {
          await createProduct(productData); 
          alert('Product created!');
          setNewProduct({ productId: '', name: '', price: 0, labelledPrice: 0, description: '', stock: 0, category: 'cosmetics', image: '' });
          fetchProducts();
      } catch(err) {
          console.error(err);
          alert('Failed to create product.');
      }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Products</h1>

      
      <details className="mb-6 border rounded-lg p-4 bg-white shadow hover:shadow-md transition">
        <summary className="font-semibold text-xl cursor-pointer">Create New Product</summary>
        <form onSubmit={handleCreateSubmit} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="productId" value={newProduct.productId} onChange={handleCreateFormChange} placeholder="Product ID" required className="p-2 border rounded" />
          <input name="name" value={newProduct.name} onChange={handleCreateFormChange} placeholder="Product Name" required className="p-2 border rounded" />
          <input name="price" value={newProduct.price} onChange={handleCreateFormChange} type="number" step="0.01" placeholder="Price" required className="p-2 border rounded" />
          <input name="labelledPrice" value={newProduct.labelledPrice} onChange={handleCreateFormChange} type="number" step="0.01" placeholder="Labelled Price" required className="p-2 border rounded" />
          <input name="stock" value={newProduct.stock} onChange={handleCreateFormChange} type="number" placeholder="Stock" required className="p-2 border rounded" />
          <input name="category" value={newProduct.category} onChange={handleCreateFormChange} placeholder="Category" required className="p-2 border rounded" />
          <input name="image" value={newProduct.image} onChange={handleCreateFormChange} placeholder="Image URL" className="p-2 border rounded md:col-span-2" />
          <textarea name="description" value={newProduct.description} onChange={handleCreateFormChange} placeholder="Description" required className="p-2 border rounded md:col-span-2" />
          <button type="submit" className="md:col-span-2 bg-linear-to-r from-blue-500 to-indigo-600 text-white p-2 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition">
            Create Product
          </button>
        </form>
      </details>

      
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Existing Products</h2>
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Stock</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" className="text-center p-4 text-gray-500">Loading products...</td></tr>
            ) : (
              products.map((product) => (
                <tr key={product.productId} className="hover:bg-gray-50 border-b transition">
                  <td className="py-2 px-4">
                    <img src={product.image[0] || '/default-product.jpg'} alt={product.name} className="w-12 h-12 object-cover rounded" />
                  </td>
                  <td className="py-2 px-4">{product.productId}</td>
                  <td className="py-2 px-4 font-medium text-gray-700">{product.name}</td>
                  <td className="py-2 px-4">${product.price.toFixed(2)}</td>
                  <td className="py-2 px-4">{product.stock}</td>
                  <td className="py-2 px-4 flex gap-4">
                    <button onClick={() => handleEditClick(product)} className="text-blue-600 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(product.productId)} className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {!loading && products.length === 0 && (
          <p className="text-center p-4 text-gray-500">No products found.</p>
        )}
      </div>

      {isModalOpen && editingProduct && (
        <EditModal product={editingProduct} onClose={handleModalClose} onSave={handleUpdateSave} />
      )}
    </div>
  );
};

export default ManageProducts;
