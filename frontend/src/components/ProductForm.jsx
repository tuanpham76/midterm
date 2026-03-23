import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = ({ product, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        image: '',
        stock: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (product) {
            setFormData(product);
        } else {
            setFormData({
                name: '',
                category: '',
                price: '',
                image: '',
                stock: ''
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                ...formData,
                price: Number(formData.price),
                stock: Number(formData.stock)
            };

            if (product) {
                await axios.put(`http://localhost:5000/products/${product.id}`, payload);
            } else {
                await axios.post('http://localhost:5000/products', payload);
            }
            onSave();
        } catch (error) {
            console.error('Error saving product:', error);
            const message = error.response?.data?.error || 'Failed to save product. Please check your input.';
            alert(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h2>{product ? '✏️ Edit Product' : '➕ Add New Product'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Product Name *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter product name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category *</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        placeholder="e.g., Laptop, Phone, Tablet"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price ($) *</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="0.00"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        min="0.01"
                        step="0.01"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image URL *</label>
                    <input
                        type="url"
                        id="image"
                        name="image"
                        placeholder="https://example.com/image.jpg"
                        value={formData.image}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="stock">Stock Quantity *</label>
                    <input
                        type="number"
                        id="stock"
                        name="stock"
                        placeholder="0"
                        value={formData.stock}
                        onChange={handleChange}
                        required
                        min="0"
                    />
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="btn btn-cancel"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        ❌ Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-save"
                        disabled={loading}
                    >
                        {loading ? '⏳ Saving...' : (product ? '💾 Update Product' : '✅ Add Product')}
                    </button>
                </div>
            </form>
        </>
    );
};

export default ProductForm;