import { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit, Package, Trash2 } from 'lucide-react';
import { Product } from '../../hooks/useProducts';
import ProductForm from './ProductForm';
import StockUpdateModal from './StockUpdateModal';

interface ProductListProps {
  products: Product[];
  loading: boolean;
  onUpdateProduct: (id: string, data: any) => Promise<void>;
  onUpdateStock: (id: string, stock: number) => Promise<void>;
  onDeleteProduct: (id: string) => Promise<void>;
  actionLoading: boolean;
}

const ProductList = ({
  products,
  loading,
  onUpdateProduct,
  onUpdateStock,
  onDeleteProduct,
  actionLoading
}: ProductListProps) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [stockUpdateProduct, setStockUpdateProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setDeletingProduct(id);
      try {
        await onDeleteProduct(id);
      } finally {
        setDeletingProduct(null);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Package className="animate-spin text-red-600" size={40} />
      </div>
    );
  }

  return (
    <div>
      {editingProduct && (
        <ProductForm
          initialData={editingProduct}
          onSubmit={(data) => {
            onUpdateProduct(editingProduct._id, data);
            setEditingProduct(null);
          }}
          onCancel={() => setEditingProduct(null)}
          loading={actionLoading}
        />
      )}

      {stockUpdateProduct && (
        <StockUpdateModal
          product={stockUpdateProduct}
          onUpdate={(stock) => {
            onUpdateStock(stockUpdateProduct._id, stock);
            setStockUpdateProduct(null);
          }}
          onClose={() => setStockUpdateProduct(null)}
          loading={actionLoading}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative h-48">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.category === 'chicks'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {product.category}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    disabled={deletingProduct === product._id}
                    className="text-red-500 hover:text-red-700 disabled:opacity-50"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-medium">ETB {product.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Stock:</span>
                  <button
                    onClick={() => setStockUpdateProduct(product)}
                    className="font-medium text-red-600 hover:text-red-700"
                  >
                    {product.stock} units
                  </button>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Minimum Order:</span>
                  <span className="font-medium">{product.minimumOrder} units</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;