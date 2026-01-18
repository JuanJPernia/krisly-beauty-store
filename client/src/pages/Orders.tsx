/**
 * Orders Page
 * 
 * Muestra el historial de compras del usuario
 * Con estado de envío y detalles de cada orden
 */

import { useEffect, useState } from 'react';
import { Package, Calendar, DollarSign, CheckCircle, Clock, XCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getUserId } from '@/lib/api';

interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
  product: {
    id: number;
    name: string;
    image: string;
  };
}

interface Order {
  id: number;
  user_id: string;
  total_price: number;
  status: string;
  created_at: string;
  items: OrderItem[];
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = getUserId();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/orders/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Entregado';
      case 'pending':
        return 'Pendiente';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-50 via-white to-pink-50">
      <Navbar />

      {/* Header */}
      <div className="pt-20 pb-12 text-center">
        <h1 className="text-5xl font-bold text-slate-900 mb-4 font-display">
          Mis Órdenes
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Historial de tus compras y estado de envío
        </p>
      </div>

      {/* Orders List */}
      <div className="container max-w-4xl mx-auto px-4 pb-20">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400 mx-auto"></div>
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100">
                {/* Order Header */}
                <div className="flex items-start justify-between mb-6 pb-6 border-b border-pink-100">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Orden #{order.id}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(order.created_at).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="font-semibold">{getStatusLabel(order.status)}</span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Productos</h4>
                  <div className="space-y-4">
                    {order.items.map(item => (
                      <div key={item.id} className="flex gap-4 p-4 bg-pink-50 rounded-lg">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900">{item.product.name}</h5>
                          <p className="text-sm text-gray-600">
                            Cantidad: {item.quantity} × ${item.price.toFixed(2)}
                          </p>
                          <p className="text-sm font-semibold text-gray-900 mt-1">
                            Subtotal: ${(item.quantity * item.price).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Total */}
                <div className="flex items-center justify-between pt-6 border-t border-pink-100">
                  <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <DollarSign className="w-5 h-5" />
                    Total
                  </div>
                  <div className="text-2xl font-bold text-pink-600">
                    ${order.total_price.toFixed(2)}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-6 pt-6 border-t border-pink-100">
                  <button className="flex-1 px-4 py-2 bg-pink-100 text-pink-600 font-semibold rounded-lg hover:bg-pink-200 transition-colors">
                    Ver Detalles
                  </button>
                  {order.status === 'completed' && (
                    <button className="flex-1 px-4 py-2 bg-blue-100 text-blue-600 font-semibold rounded-lg hover:bg-blue-200 transition-colors">
                      Descargar Recibo
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-pink-100">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No tienes órdenes aún
            </h3>
            <p className="text-gray-600 mb-6">
              Comienza a comprar nuestros productos de belleza premium
            </p>
            <a
              href="/products"
              className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all"
            >
              Explorar Productos
            </a>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
