import React, { useState } from 'react';

// Simple Star Rating Modal
const SimpleRatingModal = ({ isOpen, onClose, onSubmit }:any) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      alert('Vui lòng chọn số sao đánh giá');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(rating);
      setRating(0);
      setHover(0);
      onClose();
    } catch (err) {
      alert('Không thể gửi đánh giá');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-[320px] p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Đánh giá tour</h3>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="text-gray-400 hover:text-red-500 text-2xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Stars */}
        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              disabled={isSubmitting}
              className="transition-transform hover:scale-110"
            >
              <svg
                className={`w-10 h-10 ${
                  star <= (hover || rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-gray-200 text-gray-200'
                } transition-colors`}
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </button>
          ))}
        </div>

        {/* Rating Display */}
        {rating > 0 && (
          <p className="text-center text-gray-600 mb-6">
            Bạn đã chọn: <span className="font-bold text-yellow-500">{rating}</span> sao
          </p>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Thoát
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || rating === 0}
            className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Đang gửi...' : 'Đánh giá'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Demo Component
const RatingModel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmitRating = async (rating:any) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Rating submitted:', rating);
    alert(`Cảm ơn bạn đã đánh giá ${rating} sao!`);
  };

  return (
    <div className="  flex items-center justify-center p-4">
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-3 py-3 bg-yellow-200 text-white rounded-lg hover:bg-blue-400 transition font-medium"
      >
        ⭐
      </button>

      <SimpleRatingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitRating}
      />
    </div>
  );
};

export default RatingModel;