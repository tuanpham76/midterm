import { useState } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import './App.css';

function App() {
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    setEditingProduct(null);
    // ProductList will refetch
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🛍️ Product Management</h1>
        <button className="add-btn" onClick={handleAdd}>
          ➕ Add Product
        </button>
      </header>

      <ProductList onEdit={handleEdit} />

      {showForm && (
        <div className="modal-overlay" onClick={handleCancel}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <ProductForm
              product={editingProduct}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
