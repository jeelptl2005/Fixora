import React, { useEffect, useState } from 'react';
import './HowWork.css';

export const HowWork = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('next');

  const cards = [
    {
      step: 'STEP 01',
      icon: '🔐',
      title: 'Login to Continue',
      desc: 'Sign in to your account before booking any service securely and quickly.',
      tag: 'auth',
      tagText: 'Authentication'
    },

    {
      step: 'STEP 02',
      icon: '🔍',
      title: 'Find Your Service',
      desc: 'Search and explore trusted services tailored to your needs with smart recommendations.',
      tag: 'info',
      tagText: 'AI Powered'
    },

    {
      step: 'STEP 03',
      icon: '🛠️',
      title: 'Book Your Service',
      desc: 'Select your preferred time slot, choose recommended professionals, and confirm your booking instantly.',
      tag: 'success',
      tagText: 'Verified Workers'
    },

    {
      step: 'STEP 04',
      icon: '⏳',
      title: 'Wait for Confirmation',
      desc: 'Your request will be reviewed by the worker. Please wait until the service request is accepted and confirmed.',
      tag: 'warning',
      tagText: 'Pending Approval'
    },

    {
      step: 'STEP 05',
      icon: '📍',
      title: 'Track Your Worker',
      desc: 'Track your assigned worker in real-time and get live arrival updates directly on your device.',
      tag: 'info',
      tagText: 'Live Tracking'
    },

    {
      step: 'STEP 06',
      icon: '💳',
      title: 'Complete Payment',
      desc: 'Once the worker accepts your request, a secure payment link will be sent to your WhatsApp or registered email.',
      tag: 'success',
      tagText: 'Secure Payment'
    },

    {
      step: 'STEP 07',
      icon: '🚚',
      title: 'Worker Arrives',
      desc: 'After successful payment, the assigned worker will arrive at your location within 20–25 minutes.',
      tag: 'info',
      tagText: 'Quick Service'
    },

    {
      step: 'STEP 08',
      icon: '⭐',
      title: 'Submit Feedback',
      desc: 'After the service is completed, a feedback form will be sent to your WhatsApp or registered email. Filling it is mandatory.',
      tag: 'auth',
      tagText: 'Customer Review'
    },

    {
      step: 'STEP 09',
      icon: '📞',
      title: 'Need Help?',
      desc: 'Contact support anytime for issues, refunds, or quick rebooking of services.',
      tag: 'success',
      tagText: '24/7 Support'
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(2); // ✅ 2 cards on mobile
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(cards.length / cardsPerView);
  const startIndex = currentIndex * cardsPerView;
  const endIndex = Math.min(startIndex + cardsPerView, cards.length);
  const currentCards = cards.slice(startIndex, endIndex);

  const nextSlide = () => {
    if (currentIndex < totalPages - 1 && !isAnimating) {
      setDirection('next');
      setIsAnimating(true);
      setCurrentIndex(prev => prev + 1);
      setTimeout(() => setIsAnimating(false), 420);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0 && !isAnimating) {
      setDirection('prev');
      setIsAnimating(true);
      setCurrentIndex(prev => prev - 1);
      setTimeout(() => setIsAnimating(false), 420);
    }
  };

  const goToPage = (pageIndex) => {
    if (!isAnimating && pageIndex !== currentIndex) {
      setDirection(pageIndex > currentIndex ? 'next' : 'prev');
      setIsAnimating(true);
      setCurrentIndex(pageIndex);
      setTimeout(() => setIsAnimating(false), 420);
    }
  };

  return (
    <section className="hw-section">
      <div className="hw-header">
        <span className="hw-eyebrow">Simple Process</span>
        <h2 className="hw-title">
          How It <span className="hw-title__highlight">Works</span>
        </h2>
        <p className="hw-sub">Your journey to dream home in easy steps</p>
      </div>

      <div className="hw-carousel-container">
        <button
          className={`hw-arrow hw-arrow-left ${currentIndex === 0 || isAnimating ? 'disabled' : ''}`}
          onClick={prevSlide}
          disabled={currentIndex === 0 || isAnimating}
        >
          <i className="fas fa-chevron-left"></i>
        </button>

        <div className="hw-cards-wrapper">
          <div className="hw-cards-stage">
            <div className={`hw-cards-grid ${isAnimating ? `animate-${direction}` : ''}`}>
              {currentCards.map((card, idx) => (
                <div
                  className="hw-card"
                  key={`${currentIndex}-${idx}`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="hw-card__top">
                    <span className="hw-card__step">{card.step}</span>
                    <span className="hw-card__icon">{card.icon}</span>
                  </div>
                  <h3 className="hw-card__title">{card.title}</h3>
                  <p className="hw-card__desc">{card.desc}</p>
                  <span className={`tag-${card.tag}`}>{card.tagText}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          className={`hw-arrow hw-arrow-right ${currentIndex === totalPages - 1 || isAnimating ? 'disabled' : ''}`}
          onClick={nextSlide}
          disabled={currentIndex === totalPages - 1 || isAnimating}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      <div className="hw-dots">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            className={`hw-dot ${currentIndex === idx ? 'active' : ''}`}
            onClick={() => goToPage(idx)}
            disabled={isAnimating}
          />
        ))}
      </div>
    </section>
  );
};