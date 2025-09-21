import React, { useState, useEffect } from 'react';
import { Heart, Gift, Cake, Star, Sparkles, PartyPopper } from 'lucide-react';

const HappyBirthdayWebsite = () => {
    const [showIntro, setShowIntro] = useState(true);
    const [hasIntroEnded, setHasIntroEnded] = useState(false);
    const [introPhase, setIntroPhase] = useState(0); // 0: fade in, 1: visible, 2: fade out
  
  useEffect(() => {
    // Intro sequence
    const fadeInTimer = setTimeout(() => setIntroPhase(1), 100);
    const visibleTimer = setTimeout(() => setIntroPhase(2), 2500);
    const hideIntroTimer = setTimeout(() => {
      setShowIntro(false);
      setHasIntroEnded(true); // Set this when intro ends
    }, 3500);
    
    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(visibleTimer);
      clearTimeout(hideIntroTimer);
    };
  }, []);


  const memories = [
    {
      title: "Sweet Memories",
      message: "Every moment with you is a treasure worth celebrating",
      icon: <Heart className="w-8 h-8" />
    },
    {
      title: "Joyful Times",
      message: "Your laughter lights up every room and fills our hearts",
      icon: <Sparkles className="w-8 h-8" />
    },
    {
      title: "Beautiful Moments",
      message: "Creating wonderful memories that will last forever",
      icon: <Star className="w-8 h-8" />
    },
    {
      title: "Precious Days",
      message: "Each day with you is a gift we cherish deeply",
      icon: <Gift className="w-8 h-8" />
    }
  ];

  const wishes = [
  {
    name: "Sarah Johnson",
    message: "May your heart be filled with endless joy and your days with laughter!",
    profileImage: "/path/to/sarah.jpg",
    togetherImage: "/path/to/sarah-ryan.jpg",
    relationship: "Best Friend"
  },
  {
    name: "Mike Chen",
    message: "Wishing you another year of amazing adventures and beautiful memories!",
    profileImage: "/path/to/mike.jpg",
    togetherImage: "/path/to/mike-ryan.jpg",
    relationship: "College Buddy"
  },
  // Add more wishes...
];

  return (
    <div id="mainBody" className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50">
    {/* Intro Screen */}
      {showIntro && (
        <div className={`fixed inset-0 z-50 bg-gradient-to-br from-pink-400 via-rose-400 to-pink-500 flex items-center justify-center transition-all duration-1000 ${
          introPhase === 0 ? 'opacity-0 scale-95' : 
          introPhase === 1 ? 'opacity-100 scale-100' : 
          'opacity-0 scale-105'
        }`}>
          <div className="text-center">
            {/* Animated cake icon */}
            <div className={`mb-8 transition-all duration-700 ${
              introPhase === 1 ? 'animate-bounce' : ''
            }`}>
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full border-4 border-white/30 shadow-2xl">
                <Cake className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Main intro text */}
            <h1 className={`text-7xl md:text-9xl font-bold text-white mb-4 transition-all duration-1000 delay-300 ${
              introPhase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} 
            style={{fontFamily: 'Dancing Script, cursive', textShadow: '0 4px 20px rgba(0,0,0,0.3)'}}>
              Happy Birthday!
            </h1>

            {/* Subtitle */}
            <p className={`text-xl md:text-2xl text-white/90 font-light transition-all duration-1000 delay-500 ${
              introPhase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              Get ready for something special...
            </p>

            {/* Floating hearts animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute text-white/30 transition-all duration-1000 delay-700 ${
                    introPhase >= 1 ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    top: `${10 + Math.random() * 80}%`,
                    fontSize: `${1 + Math.random() * 1.5}rem`,
                    animationDelay: `${Math.random() * 2}s`,
                    transform: introPhase >= 1 ? 'scale(1)' : 'scale(0)',
                  }}
                >
                  {['💖', '✨', '🎉', '🎂', '🎈'][Math.floor(Math.random() * 5)]}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Hero Section */}
      <section 
  id="heroSec" 
  className={`min-h-screen flex items-center justify-center px-6 py-15 relative overflow-hidden transition-all duration-1000
    ${!hasIntroEnded ? 'opacity-0 bg-gradient-to-br from-pink-400 via-rose-400 to-pink-500' : 'opacity-100 bg-gradient-to-b from-pink-50 via-white to-pink-50'}`}
>
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-pink-200 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute bottom-32 right-16 w-40 h-40 bg-rose-200 rounded-full opacity-40 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-300 rounded-full opacity-20 blur-2xl"></div>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="mb-8">
              <div className="inline-flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center shadow-lg">
                  <Cake className="w-6 h-6 text-white" />
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-400 rounded-full flex items-center justify-center shadow-lg">
                  <PartyPopper className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-4 leading-none" 
                  style={{fontFamily: 'Dancing Script, cursive'}}>
                Happy Birthday
              </h1>
              
              <div className="text-2xl md:text-3xl text-pink-500 mb-8" 
                   style={{fontFamily: 'Dancing Script, cursive'}}>
                to my one and only, <b>Ryan!</b>
              </div>
            </div>
            
            <p className="text-lg md:text-xl text-gray-600 mb-10 font-light leading-relaxed max-w-lg mx-auto lg:mx-0">
              Today we celebrate not just another year, but another year of your beautiful soul, 
              your infectious laughter, and the countless ways you make this world brighter.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <div className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <Heart className="w-5 h-5" />
                <span>Check Birthday Greetings</span>
              </div>
              <div className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-pink-600 border-2 border-pink-200 rounded-full font-semibold hover:bg-pink-50 transition-all duration-300">
                <Sparkles className="w-5 h-5" />
                <span>View Memories</span>
              </div>
            </div>

            {/* Birthday stats */}
            <div className="mt-12 flex justify-center lg:justify-start space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-500">∞</div>
                <div className="text-sm text-gray-500 font-medium">Memories Made</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-500">365</div>
                <div className="text-sm text-gray-500 font-medium">Days of Joy Ahead</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-500">1</div>
                <div className="text-sm text-gray-500 font-medium">Amazing Person</div>
              </div>
            </div>
          </div>

          {/* Person's Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              {/* Main image placeholder */}
              <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-3xl bg-gradient-to-br from-pink-100 to-rose-100 border-4 border-white shadow-2xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 bg-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Heart className="w-12 h-12 text-white" />
                    </div>
                    <div className="text-pink-600 font-semibold text-lg">Your Beautiful Photo</div>
                    <div className="text-pink-500 text-sm mt-2">Goes Here</div>
                  </div>
                </div>
                
                {/* Decorative border pattern */}
                <div className="absolute inset-0 rounded-3xl border-4 border-pink-200 opacity-50"></div>
              </div>

              {/* Floating decorative elements around the image */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl">🎉</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-gradient-to-br from-pink-200 to-rose-300 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-xl">🎂</span>
              </div>
              <div className="absolute top-1/4 -left-8 w-12 h-12 bg-gradient-to-br from-purple-200 to-pink-300 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-xl">🌹</span>
              </div>
              <div className="absolute bottom-1/4 -right-8 w-12 h-12 bg-gradient-to-br from-rose-200 to-pink-300 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-lg">✨</span>
              </div>

              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 rounded-3xl blur-3xl opacity-20 scale-110 -z-10"></div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-pink-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-pink-400 rounded-full mt-2"></div>
          </div>
        </div>
      </section>


      {/* Main Message Section */}
        <section className="py-24 px-6 bg-pink-50">
        <div className="max-w-4xl mx-auto">
            <div className="relative group">
            {/* Decorative background elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-200/50 to-rose-200/50 rounded-[2.5rem] transform rotate-2 group-hover:rotate-1 transition-transform duration-300"></div>
            <div className="absolute inset-0 bg-gradient-to-l from-pink-200/50 to-rose-200/50 rounded-[2.5rem] transform -rotate-2 group-hover:rotate-1 transition-transform duration-300"></div>
            
            {/* Main content card */}
            <div className="relative bg-white/80 backdrop-blur-lg rounded-[2rem] p-12 md:p-16 shadow-xl hover:shadow-2xl transition-all duration-500 border border-pink-100/50">
                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center transform rotate-12 group-hover:rotate-45 transition-transform duration-500">
                <Heart className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-br from-pink-300 to-rose-300 rounded-full"></div>
                
                {/* Main content */}
                <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center group-hover:scale-105 transition-transform duration-300"
                    style={{fontFamily: 'Dancing Script, cursive'}}>
                    A Special Day for a Special Person
                </h2>
                
                {/* Interactive text reveal */}
                <div className="relative overflow-hidden">
                    <p className="text-lg text-gray-600 leading-relaxed text-center max-w-3xl mx-auto transform group-hover:translate-y-0 transition-all duration-500 opacity-90 group-hover:opacity-100">
                    Today marks another beautiful chapter in your story. We celebrate not just the passing of time, 
                    but the incredible person you've become and the joy you bring to everyone around you.
                    </p>
                    
                    {/* Interactive elements */}
                    <div className="mt-8 flex justify-center space-x-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <span className="inline-block text-2xl">✨</span>
                    <span className="inline-block text-2xl">💖</span>
                    <span className="inline-block text-2xl">🌟</span>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>

      {/* Memory Cards Section */}
        <section className="relative">
        {memories.map((memory, index) => (
            <div
            key={index}
            className={`min-h-screen relative flex items-center justify-center px-6 py-24 ${
                index % 2 === 0 ? 'bg-pink-50' : 'bg-white'
            }`}
            >
            <div className="absolute inset-0 opacity-10">
                {/* Decorative background patterns */}
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-pink-300 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-rose-300 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Image Container */}
                <div className={`relative group ${index % 2 === 0 ? 'order-1' : 'order-1 lg:order-2'}`}>
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.02]">
                    {/* Replace the div below with an actual image */}
                    <div className="aspect-[4/3] bg-gradient-to-br from-pink-200 to-rose-200 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center text-pink-500/30">
                        <div className="text-9xl">{memory.icon}</div>
                        </div>
                    </div>
                    
                    {/* Image overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-pink-100 rounded-full blur-2xl opacity-60"></div>
                    <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-rose-100 rounded-full blur-2xl opacity-60"></div>
                </div>

                {/* Content Container */}
                <div className={`relative z-10 ${index % 2 === 0 ? 'order-2' : 'order-2 lg:order-1'}`}>
                    <div className="space-y-8 p-8">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center shadow-xl transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                        <div className="text-white w-8 h-8">
                        {memory.icon}
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900"
                        style={{fontFamily: 'Dancing Script, cursive'}}>
                        {memory.title}
                    </h2>

                    {/* Message */}
                    <p className="text-xl text-gray-600 leading-relaxed">
                        {memory.message}
                    </p>

                    {/* Decorative line */}
                    <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"></div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        ))}
        </section>

        {/* Birthday Wishes Section */}
        <section className="py-24 px-6 bg-gradient-to-b from-white to-pink-50">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                style={{fontFamily: 'Dancing Script, cursive'}}>
                Birthday Wishes
            </h2>
            <p className="text-xl text-gray-600">Messages from your loved ones</p>
            </div>
            
            <div className="grid gap-8 md:gap-12">
            {wishes.map((wish, index) => (
                <div key={index} 
                    className="group relative bg-white rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className="grid md:grid-cols-[auto,1fr] gap-8">
                    {/* Left Column - Images */}
                    <div className="space-y-6">
                    {/* Profile Image */}
                    <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto md:mx-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                        <img
                        src={wish.profileImage}
                        alt={wish.name}
                        className="relative w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
                        />
                    </div>
                
                    </div>

                    {/* Right Column - Content */}
                    <div className="relative">
                    {/* Decorative elements */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-pink-100 rounded-full blur-xl opacity-40"></div>
                    
                    {/* Content */}
                    <div className="relative space-y-4">
                        <div className="space-y-1">
                        <h3 className="text-2xl font-bold text-gray-900">{wish.name}</h3>
                        <p className="text-pink-500 font-medium">{wish.relationship}</p>
                        </div>
                        
                        <div className="relative">
                        <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-pink-500 to-rose-500 rounded-full"></div>
                        <p className="text-lg text-gray-600 leading-relaxed italic">
                            "{wish.message}"
                        </p>
                        </div>

                        {/* Interactive elements */}
                        <div className="flex items-center space-x-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                            <Heart className="w-4 h-4 text-pink-500" />
                        </div>
                        <span className="text-sm text-pink-500 font-medium">Sending love</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </div>
        </section>

      {/* Call to Action */}
      <section className="py-24 px-6 bg-gradient-to-r from-pink-500 to-pink-600">
        <div className="max-w-2xl mx-auto text-center text-white">
          <div className="text-6xl mb-8">🎂</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Make a Wish
          </h2>
          <p className="text-xl text-pink-100 mb-8 leading-relaxed">
            Blow out the candles and let this new year be filled with everything your heart desires
          </p>
          <div className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-pink-600 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <span>Cheers to You!</span>
            <Heart className="w-5 h-5" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center space-x-2 mb-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-pink-500 rounded-full"></div>
            ))}
          </div>
          <p className="text-lg text-gray-300 mb-2">
            With love and best wishes
          </p>
          <p className="text-gray-400">
            May your birthday be the start of an incredible year ahead
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HappyBirthdayWebsite;