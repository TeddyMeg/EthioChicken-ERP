import { useState } from 'react';
import { motion } from 'framer-motion';
import { useProducts } from '../../hooks/useProducts';
import { useAdminProducts } from '../../hooks/useAdminProducts';
import ProductForm from '../../components/admin/ProductForm';
import ProductList from '../../components/admin/ProductList';
import { Plus } from 'lucide-react';

const ManageProducts = () => {
  const [showForm, setShowForm] = useState(false);
  const { products, loading: productsLoading, refreshProducts } = useProducts();
  const { createProduct, updateProduct, deleteProduct, updateStock, loading: actionLoading } = useAdminProducts();

  const handleCreateProduct = async (productData: any) => {
    await createProduct(productData);
    refreshProducts();
    setShowForm(false);
  };

  const handleUpdateProduct = async (id: string, productData: any) => {
    await updateProduct(id, productData);
    refreshProducts();
  };

  const handleUpdateStock = async (id: string, stock: number) => {
    await updateStock(id, stock);
    refreshProducts();
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id);
    refreshProducts();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>
          <p className="text-gray-600 mt-2">Add, edit, and manage your product inventory</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          <Plus size={20} className="mr-2" />
          Add Product
        </button>
      </motion.div>

      {showForm && (
        <ProductForm
          onSubmit={handleCreateProduct}
          onCancel={() => setShowForm(false)}
          loading={actionLoading}
        />
      )}

      <ProductList
        products={products}
        loading={productsLoading}
        onUpdateProduct={handleUpdateProduct}
        onUpdateStock={handleUpdateStock}
        onDeleteProduct={handleDeleteProduct}
        actionLoading={actionLoading}
      />
    </div>
  );
};

export default ManageProducts;