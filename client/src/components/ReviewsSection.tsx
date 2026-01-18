/**
 * Reviews Section Component
 * 
 * Muestra reseñas reales de productos con calificaciones (1-5 estrellas)
 * y comentarios de clientes
 */

import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

export interface Review {
  id: number;
  product_id: number;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface ReviewsSectionProps {
  productId: number;
  onReviewAdded?: () => void;
}

export default function ReviewsSection({ productId, onReviewAdded }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadReviews();
  }, [productId]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/reviews/product/${productId}`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newReview.comment.trim()) {
      alert('Por favor escribe un comentario');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: productId,
          rating: newReview.rating,
          comment: newReview.comment,
        }),
      });

      if (response.ok) {
        setNewReview({ rating: 5, comment: '' });
        await loadReviews();
        if (onReviewAdded) {
          onReviewAdded();
        }
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error al enviar la reseña');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            size={16}
            className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <section className="py-12 bg-white rounded-2xl p-8 border border-pink-100">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Reseñas de Clientes</h2>
        
        {/* Resumen de calificación */}
        <div className="flex items-center gap-4 mb-8">
          <div>
            <div className="text-4xl font-bold text-gray-900">{averageRating}</div>
            <div className="text-sm text-gray-600">{reviews.length} reseñas</div>
          </div>
          <div>
            {renderStars(Math.round(Number(averageRating)))}
          </div>
        </div>

        {/* Formulario para agregar reseña */}
        <form onSubmit={handleSubmitReview} className="bg-pink-50 p-6 rounded-lg mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">Deja tu reseña</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Calificación
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    size={24}
                    className={
                      star <= newReview.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300 hover:text-yellow-300'
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comentario
            </label>
            <textarea
              value={newReview.comment}
              onChange={e => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
              placeholder="Comparte tu experiencia con este producto..."
              rows={4}
              className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {submitting ? 'Enviando...' : 'Enviar Reseña'}
          </button>
        </form>
      </div>

      {/* Lista de reseñas */}
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-400 mx-auto"></div>
        </div>
      ) : reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map(review => (
            <div key={review.id} className="border-b border-pink-100 pb-6 last:border-b-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-semibold text-gray-900">{review.user_id}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(review.created_at).toLocaleDateString('es-ES')}
                  </div>
                </div>
                {renderStars(review.rating)}
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No hay reseñas aún. ¡Sé el primero en dejar una!</p>
        </div>
      )}
    </section>
  );
}
