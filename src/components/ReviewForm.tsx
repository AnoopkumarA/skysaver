import { useState, useEffect } from 'react';
import { Star, Send, Loader2, X } from 'lucide-react';
import { supabase, Review } from '@/lib/supabase';

interface ReviewFormProps {
  isOpen?: boolean;
  onClose?: () => void;
  onReviewSubmitted?: () => void;
}

export default function ReviewForm({ isOpen = true, onClose, onReviewSubmitted }: ReviewFormProps) {
  const [formData, setFormData] = useState<Omit<Review, 'id' | 'created_at'>>({
    name: '',
    email: '',
    role: '',
    location: '',
    rating: 0,
    review_text: '',
    savings: '',
    destination: '',
    verified: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value, 10) : value
    }));
  };

  const handleRatingClick = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Validate required fields
      if (!formData.name.trim() || !formData.review_text.trim() || !formData.savings?.trim() || !formData.email?.trim() || !formData.role?.trim() || !formData.destination?.trim() || !formData.location?.trim()) {
        throw new Error('All fields are Mandatory.');
      }

      // Insert review into Supabase
      const { error } = await supabase.from('reviews').insert([
        {
          name: formData.name.trim(),
          email: formData.email?.trim() || null,
          role: formData.role?.trim() || null,
          location: formData.location?.trim() || null,
          rating: formData.rating,
          review_text: formData.review_text.trim(),
          savings: formData.savings?.trim(),
          destination: formData.destination?.trim() || null,
          verified: false // New reviews start as unverified
        }
      ]);

      if (error) {
        throw error;
      }

      setSubmitStatus('success');
      // Reset form
      setFormData({
        name: '',
        email: '',
        role: '',
        location: '',
        rating: 0,
        review_text: '',
        savings: '',
        destination: '',
        verified: false
      });

      // Callback to refresh reviews
      if (onReviewSubmitted) {
        setTimeout(() => {
          onReviewSubmitted();
          setSubmitStatus('idle');
          // Close modal after successful submission
          if (onClose) {
            setTimeout(() => {
              onClose();
            }, 1500);
          }
        }, 2000);
      }
    } catch (error: any) {
      console.error('Error submitting review:', error);
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div
          className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] backdrop-blur-2xl shadow-[0_25px_70px_rgba(2,6,23,0.8)] transform transition-all duration-300 scale-100 opacity-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-aurora/5 via-transparent to-skywave/5 opacity-0 transition-opacity duration-500 hover:opacity-100" />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/70 transition-all duration-200 hover:border-aurora/50 hover:bg-white/10 hover:text-aurora"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="relative z-10 p-6">
        <div className="mb-5">
          <h3 className="text-xl font-bold text-white mb-1.5">Share Your Experience</h3>
          <p className="text-xs text-white/70">
            Help others discover great deals
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide text-white/70" htmlFor="name">
                Name *
              </label>
              <input
                className="form-field text-sm py-2"
                type="text"
                id="name"
                name="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide text-white/70" htmlFor="email">
                Email *
              </label>
              <input
                className="form-field text-sm py-2"
                type="email"
                id="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Role, Location, Destination, Savings - Compact Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide text-white/70" htmlFor="role">
                Role *
              </label>
              <input
                className="form-field text-sm py-2"
                type="text"
                id="role"
                name="role"
                placeholder="Student, Employee..."
                value={formData.role}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide text-white/70" htmlFor="location">
                Location *
              </label>
              <input
                className="form-field text-sm py-2"
                type="text"
                id="location"
                name="location"
                placeholder="City, Country"
                value={formData.location}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide text-white/70" htmlFor="destination">
                Destination *
              </label>
              <input
                className="form-field text-sm py-2"
                type="text"
                id="destination"
                name="destination"
                placeholder="Where did you travel?"
                value={formData.destination}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide text-white/70" htmlFor="savings">
                Savings *
              </label>
              <input
                className="form-field text-sm py-2"
                type="text"
                id="savings"
                name="savings"
                placeholder="30%, $500..."
                value={formData.savings}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Rating and Review Text Row */}
          <div className="space-y-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide text-white/70">
                Rating *
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingClick(star)}
                    disabled={isSubmitting}
                    className={`transition-all duration-200 hover:scale-110 ${
                      star <= formData.rating
                        ? 'text-yellow-400'
                        : 'text-white/30 hover:text-yellow-400/50'
                    }`}
                  >
                    <Star
                      className={`h-5 w-5 ${
                        star <= formData.rating ? 'fill-current' : ''
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-xs text-white/70">
                  {formData.rating} {formData.rating === 1 ? 'star' : 'stars'}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wide text-white/70" htmlFor="review_text">
                Your Review *
              </label>
              <textarea
                className="form-field min-h-[100px] resize-none text-sm py-2"
                id="review_text"
                name="review_text"
                placeholder="Share your experience..."
                value={formData.review_text}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || submitStatus === 'success'}
            className="btn-primary w-full flex items-center justify-center gap-2 py-2.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : submitStatus === 'success' ? (
              <>
                <span className="text-green-400">✓</span>
                <span>Submitted!</span>
              </>
            ) : (
              <>
                <Send className="h-3.5 w-3.5" />
                <span>Submit Review</span>
              </>
            )}
          </button>

          {/* Error Message */}
          {submitStatus === 'error' && errorMessage && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
              {errorMessage}
            </div>
          )}

          {/* Success Message */}
          {submitStatus === 'success' && (
            <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-xs text-green-400">
              Thank you! Your review will be displayed after moderation.
            </div>
          )}
        </form>
          </div>
        </div>
      </div>
    </>
  );
}

