import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Star } from 'lucide-react';
import { Review } from '../../hooks/useReviews';

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList = ({ reviews }: ReviewListProps) => {
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <motion.div
          key={review._id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-semibold">{review.user.name}</h4>
              <p className="text-sm text-gray-600">{review.user.company}</p>
            </div>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`${
                    i < review.rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <p className="text-gray-700 mb-2">{review.comment}</p>
          
          <p className="text-sm text-gray-500">
            {format(new Date(review.createdAt), 'MMM dd, yyyy')}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default ReviewList;