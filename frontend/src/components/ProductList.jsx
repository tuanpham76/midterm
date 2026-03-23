import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = ({ onEdit }) => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, [category, search]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = {};
            if (category) params.category = category;
            if (search) params.search = search;
            const response = await axios.get('http://localhost:5000/products', { params });
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`http://localhost:5000/products/${id}`);
                fetchProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Failed to delete product');
            }
        }
    };

    return (
        <>
            <section className="filters">
                <h2>🔍 Filter & Search</h2>
                <div className="filter-inputs">
                    <input
                        type="text"
                        placeholder="Filter by category (e.g., Laptop, Phone)"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Search by product name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </section>

            {loading ? (
                <div className="loading">⏳ Loading products...</div>
            ) : products.length === 0 ? (
                <div className="empty-state">
                    <h3>📦 No products found</h3>
                    <p>Try adjusting your filters or add some products.</p>
                </div>
            ) : (
                <div className="products-grid">
                    {products.map((product) => (
                        <div key={product.id} className="product-card">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="product-image"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                                }}
                            />
                            <div className="product-info">
                                <h3 className="product-name">{product.name}</h3>
                                <span className="product-category">{product.category}</span>
                                <div className="product-details">
                                    <span className="product-price">${product.price}</span>
                                    <span className="product-stock">Stock: {product.stock}</span>
                                </div>
                                <div className="product-actions">
                                    <button
                                        className="btn btn-edit"
                                        onClick={() => onEdit(product)}
                                    >
                                        ✏️ Edit
                                    </button>
                                    <button
                                        className="btn btn-delete"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        🗑️ Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default ProductList;