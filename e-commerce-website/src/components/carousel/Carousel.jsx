import React, { useState, useEffect, useRef } from 'react';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);
  const transitionRef = useRef(true);

  // Sample hero slides data - replace with your own content or API data
  const slides = [
    {
      id: 1,
      title: "Summer Collection 2023",
      subtitle: "Discover our new arrivals",
      cta: "Shop Now",
      bgColor: "bg-gradient-to-r from-pink-500 to-purple-600",
      image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80"
    },
    {
      id: 2,
      title: "Limited Time Offer",
      subtitle: "Up to 50% off selected items",
      cta: "View Deals",
      bgColor: "bg-gradient-to-r from-blue-500 to-teal-400",
      image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
    },
    {
      id: 3,
      title: "New Arrivals",
      subtitle: "Fresh styles for the season",
      cta: "Explore",
      bgColor: "bg-gradient-to-r from-amber-500 to-red-500",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    }
  ];

  // Auto-advance slides with smooth transition
  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      transitionRef.current = true;
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
  };

  // Reset interval when user interacts
  const resetInterval = () => {
    clearInterval(intervalRef.current);
    startInterval();
  };

  // Handle next slide
  const nextSlide = () => {
    transitionRef.current = true;
    setCurrentSlide(prev => (prev + 1) % slides.length);
    resetInterval();
  };

  // Handle previous slide
  const prevSlide = () => {
    transitionRef.current = true;
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
    resetInterval();
  };

  // Handle dot navigation
  const goToSlide = (index) => {
    transitionRef.current = true;
    setCurrentSlide(index);
    resetInterval();
  };

  useEffect(() => {
    startInterval();
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {/* Slides container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full flex items-center transition-opacity duration-1000 ${transitionRef.current ? 'opacity-100' : 'opacity-0'}`}
            style={{
              transform: `translateX(${(index - currentSlide) * 100}%)`,
              transition: 'transform 1000ms ease-in-out',
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className={`absolute inset-0 ${slide.bgColor} opacity-70`}></div>
            <div className="container mx-auto px-6 relative z-10 text-white">
              <div className="max-w-lg">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 animate-fadeIn delay-100">
                  {slide.subtitle}
                </p>
                <button className="px-8 py-3 bg-white text-gray-800 font-bold rounded-full hover:bg-gray-100 transition-colors duration-300 animate-fadeIn delay-200">
                  {slide.cta}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 z-10"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 z-10"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/70'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;