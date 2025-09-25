import React, { useState, useEffect } from 'react';
import { Heart, Gift, Cake, Star, Sparkles, PartyPopper } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const MemoryCarousel = ({ images, groupId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [prevIndex, setPrevIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0); // Add this new state

  const slideStyles = `
    @keyframes slideLeft {
      from { transform: translateX(0); }
      to { transform: translateX(-100%); }
    }
    @keyframes slideRight {
      from { transform: translateX(0); }
      to { transform: translateX(100%); }
    }
    @keyframes slideInLeft {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }
    @keyframes slideInRight {
      from { transform: translateX(-100%); }
      to { transform: translateX(0); }
    }
  `;

  const nextImage = () => {
    setPrevIndex(currentIndex);
    setDirection('slide-left');
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setAnimationKey(prev => prev + 1); // Increment key to force re-render
  };

  const prevImage = () => {
    setPrevIndex(currentIndex);
    setDirection('slide-right');
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setAnimationKey(prev => prev + 1); // Increment key to force re-render
  };

  const goToImage = (index) => {
    setPrevIndex(currentIndex);
    setDirection(index > currentIndex ? 'slide-left' : 'slide-right');
    setCurrentIndex(index);
    setAnimationKey(prev => prev + 1); // Increment key to force re-render
  };

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
      <style>{slideStyles}</style>
      <div className="aspect-[4/3] relative overflow-hidden">
        {/* Previous Image */}
        <div 
          key={`prev-${animationKey}`} // Add key prop
          className="absolute inset-0"
          style={{
            animation: direction === 'slide-left' 
              ? 'slideLeft 0.5s forwards'
              : direction === 'slide-right' 
                ? 'slideRight 0.5s forwards'
                : 'none',
            zIndex: direction ? 1 : 0
          }}
        >
          <img 
            src={images[prevIndex]} 
            alt={`Memory ${prevIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Current Image */}
        <div 
          key={`current-${animationKey}`} // Add key prop
          className="absolute inset-0"
          style={{
            animation: direction === 'slide-left'
              ? 'slideInLeft 0.5s forwards'
              : direction === 'slide-right'
                ? 'slideInRight 0.5s forwards'
                : 'none',
            zIndex: direction ? 2 : 1
          }}
        >
          <img 
            src={images[currentIndex]} 
            alt={`Memory ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            onAnimationEnd={() => setDirection(null)}
          />
        </div>

        {/* Navigation Controls */}
        <button 
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full 
                   flex items-center justify-center backdrop-blur-sm transition-all duration-300 
                   hover:bg-white hover:scale-110 z-10"
        >
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full 
                   flex items-center justify-center backdrop-blur-sm transition-all duration-300 
                   hover:bg-white hover:scale-110 z-10"
        >
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToImage(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'bg-white w-4' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const HappyBirthdayWebsite = () => {
    const styles = `
      @keyframes bounce {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-10px);
        }
      }
    `;
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
      AOS.init({
        duration: 800,
        once: true,
        easing: 'ease-out'
      });
    }, []);

    const [showIntro, setShowIntro] = useState(true);
    const [hasIntroEnded, setHasIntroEnded] = useState(false);
    const [showReturnToTop, setShowReturnToTop] = useState(false);
    const [introPhase, setIntroPhase] = useState(0); // 0: fade in, 1: visible, 2: fade out
  
    const scrollToSection = (sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    };
  useEffect(() => {
    document.title = "Happy Birthday, Jy!";
  }, []);
  useEffect(() => {
    // Intro sequence
    const fadeInTimer = setTimeout(() => setIntroPhase(1), 1000);
    const visibleTimer = setTimeout(() => setIntroPhase(2), 3500);
    const hideIntroTimer = setTimeout(() => {
      setShowIntro(false);
      setHasIntroEnded(true); // Set this when intro ends
    }, 4500);
    
    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(visibleTimer);
      clearTimeout(hideIntroTimer);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('heroSec');
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        setShowReturnToTop(window.scrollY > heroBottom);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const returnToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const memories = [
    {
      title: "Junior Highschool Era",
      message: "When we first met, you immediately brought light and joy into my life. The past years sun na highschool ak was not comparable to the time na umabot ka saak life. Napakajoyful mo sun, im humor, aura, and smile, na hasta yana grateful ak na naiimdan ko la gihapon and dire nagffade.",
      icon: <Heart className="w-8 h-8" />,
      images: [
        "/images/FB_IMG_1758801452235.jpg",
        "/images/FB_IMG_1758801441694.jpg",
        "/images/IMG20210813142322.jpg",
        "/images/FB_IMG_1758801578763.jpg",
        "/images/FB_IMG_1758801809950.jpg",
        "/images/IMG20200304171621.jpg"
      ]
    },
    {
      title: "Senior Highschool Era",
      message: "Naimdan ko dihan love kun papano ka magpersevere para makuha an imo mga karuyag, and it made me admire you even more. Pirme ka nagsstrive to be better, leading me to be inspired by your dedication and hard work. Napakaproud ko saim pirme love.",
      icon: <Sparkles className="w-8 h-8" />,
      images: [
        "/images/IMG_9054.JPG",
        "/images/FB_IMG_1758810427446.jpg",
        "/images/FB_IMG_1758801816243.jpg",
        "/images/IMG20220311172004.jpg",
        "/images/IMG_20220521_152527.jpg"
      ]
    },
    {
      title: "College Days",
      message: "Constantly na gintetest ka sa mga challenges dida saim pag-iskwela dida sa LNU pero never ak nagdoubt talaga saim na di mo makakaya an mga bagay na gintthrow against saim. Hasta yana, tama ak sun na ak belief kasi tanan na challenges naovercome mo, you always come out stronger and better from every obstacle na im ginfface, and napakaproud ko na sadsun ak girlfriend.",
      icon: <Star className="w-8 h-8" />,
      images: [
        "/images/Messenger_creation_69C00B39-9E1C-479F-8402-70DC18046A6E.jpeg",
        "/images/Messenger_creation_604FAB7D-1067-4EE5-846D-E477608269D5.jpeg",
        "/images/Messenger_creation_269543D5-EE5F-4AE8-9E68-A781F6FB1206.jpeg",
        "/images/Messenger_creation_233257793111291.jpeg",
        "/images/Messenger_creation_403684782355861.jpeg",
        "/images/Messenger_creation_783026357053266.jpeg",
        "/images/Messenger_creation_974339510932296.jpeg",
        "/images/Messenger_creation_1072991530599876.jpeg",
        "/images/Messenger_creation_1588593648617041.jpeg",
        "/images/Messenger_creation_7435154673218473.jpeg",
      ]
    },
    {
      title: "Precious Days",
      message: "Kapag kaupod ko ikaw love, waray second na nasasayang, kay iton manlat an mga time na nakakafeel ak na happy ak talaga dahil saim presence. Hopefully, mabless kit na magdaramo pa an mga adlaw na magkaupod kit, for me to contantly express my love for you.",
      icon: <Gift className="w-8 h-8" />,
      images: [
        "/images/Messenger_creation_CA08806E-F7A7-4523-8D15-24FDA9368CE1.jpeg",
        "/images/Messenger_creation_B0C945FB-8A3B-4CBE-92B1-690969851644.jpeg",
        "/images/Messenger_creation_D1F79F22-76C3-416E-9200-6E103614500D.jpeg",
        "/images/Messenger_creation_A3CE05BA-D7FA-44C5-B320-CF7F0DC647C0.jpeg",
        "/images/Messenger_creation_70B10AA0-4E21-4943-8C23-565C7D7D4FBC.jpeg",
        "/images/Messenger_creation_34926F72-02BB-463A-8F26-71286156BEB9.jpeg",
      ]
    }
  ];

  const wishes = [
    {
      message: "Sana na maintindihan ka love sa mga tawo in the way na naiintindihan ko ikaw.",
      emoji: "💖"
    },
    {
      message: "Hoping love na makahanap ka pirme happiness sa tanan na im ginhihimo.",
      emoji: "✨"
    },
    { message: "Sana love na maging safe and healthy ka pirme at all times.", 
      emoji: "🌟" 
    },
    { 
      message: "Wishing you love na maging successful ka sa tanan na im ginhihimo.", 
      emoji: "🚀" 
    },
    {
      message: "Kunta na magkamayda ka pirme enough na kwarta panglazada and shopee.",
      emoji: "😊"
    },
    {
      message: "Wish ko love na bisan nano na im gastos, is makapagsave ka la gihap para mayda ka gagamiton at all times HAHAHAH.",
      emoji: "🌈"
    },
    {
      message: "Kunta maintindihan sa mga tawo na nasusul an ka kapag ginpapansin nira an imo skin blemishes, kunta marealize nira na kahit sira mayda manlat sun and totally normal la talaga tun.",
      emoji: "🎉"
    },
    {
      message: "Kunta na magkamayda kam pirme time saim friends para makapagcatch up kay aram ko na kelangan mo lat tun sira",
      emoji: "🌸"
    },
    {
      message: "Wish ko love para saim family na kunta mas magkamayda pa better days sira imo kuya, si anli, dikan sim mama.",
      emoji: "🎂"
    },
    {
      message: "Kunta na magkamayda ka pirme time para saim self para makapagrelax ka and makapagself care ka.",
      emoji: "💆‍♀️"
    },
    {
      message:"Sana love dire mawara an imo confidence saim sarili, na kunta pirme mo maisip na kaya mo mag execute no matter what the situation is.",
      emoji: "💪"
    },
    {
      message: "Wish ko love na maging patient ka pirme sa mga bagay na di mo kaya ihandle kaagad sin maayos.",
      emoji: "🧘‍♀️"
    },
    {
      message: "Kunta love na dire mawara saim an pagiging understanding towards sa mga tawo na namemeet mo.",
      emoji: "🤝"
    },
    {
      message: "Sana love na mahanap mo pirme an time para maisip mo ak (hehe)",
      emoji: "😘"
    },
    {
      message: "Kunta love na dire mawara saim an pagiging open minded sa mga bagay na di mo pa naexperience.",
      emoji: "🧠"
    },
    {
      message: "Kunta love na matagan ka pa damo na opportunities para magamit and maimprove mo an imo skills.",
      emoji: "🎯"
    },
    {
      message: "Kunta love na magkamayda ka pirme time para saim family, friends, and sa ak.",
      emoji: "👨‍👩‍👧‍👦"
    },
    {
      message: "Sana love na makaupod ko ta ikaw utro dihan sa Manila for many more adventures and experiences."
    },
    {
      message: "Wish ko love na kunta maibanan im pagka OA sa mga bagay-bagay HAHAHAHAH",
      emoji: "😂"
    },
    {
      message: "Kunta na dire ka na mamroblema love sa kun nano im susul uton for certain occasions kay damo manlat talaga im bado HAHAHAHAH",
      emoji: "👗"
    },
    {
      message: "Sana love na mas damo pa na photobooth at matry para mas damo ato pictures hehehe",
      emoji: "📸"
    },
    {
      message: "Wish ko love na kunta pag nalalag kit dire na magsuol im tiyan para foodtrip kit sin maayos HAHAHAH",
      emoji: "🍔"
    }
  ];


  return (
    
    <div id="mainBody" className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50">
    <style>{styles}</style>
    <audio autoPlay loop hidden>
      <source src="/YTDown.com_YouTube_Le-John-Naiilang-Official-Lyric-Video_Media_WUvD8XAPI4E_008_128k.m4a" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
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
              Happy Birthday, Jy!
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

        <div className="max-w-6xl py-10 px-5 mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
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
                to my one and only, <b>Jyra!</b>
              </div>
            </div>
            
            <p className="text-lg md:text-xl text-gray-600 mb-10 font-light leading-relaxed max-w-lg mx-auto lg:mx-0">
              For the person that constantly brings a smile to my face, and fills my life with love and laughter.
              <br />
              <b>22</b> wonderful years, which brought joy to everyone around you, and I can't wait to see what the future holds for you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <div 
                onClick={() => scrollToSection('birthdayWishes')}
                className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <Heart className="w-5 h-5" />
                <span>Check 22 Wishes</span>
              </div>
              <div 
                onClick={() => scrollToSection('mainMessage')}
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-pink-600 border-2 border-pink-200 rounded-full font-semibold hover:bg-pink-50 transition-all duration-300 cursor-pointer">
                <Sparkles className="w-5 h-5" />
                <span>View Messages</span>
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
                  <div className="">
                    <img src="/images/Messenger_creation_DF1153C4-C1F6-440C-BF0C-B2F2215D2DCA.jpeg" alt="Jyra" className="w-full h-full object-cover rounded-3xl border-4 border-white shadow-lg" />
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
      </section>
      <hr />

      {/* Main Message Section */}
        <section className="py-24 px-6 bg-pink-50" id="mainMessage" data-aos="fade-up"> 
          <div className="max-w-4xl mx-auto" data-aos="zoom-in" data-aos-delay="200">
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
                    To the most special person in my life,<br /> to my "love"
                </h2>
                
                {/* Interactive text reveal */}
                <div className="relative overflow-hidden">
                    <p className="text-lg text-gray-600 leading-relaxed text-center max-w-3xl mx-auto transform group-hover:translate-y-0 transition-all duration-500 opacity-90 group-hover:opacity-100">
                    Happy Birthday love! 22 kana grabe, wara la ig abat sito time na nakadto kit sa waiting shed, na kinukulbaan ka kay wara talaga saim plano na magtake Social Work na program, 
                    let alone an im pag-iskwela lat sa Tacloban, pero ginface mo tun courageously and adi ka na yana! Proud na proud ak pirme saim love, di ko ngani tun naeexpress sin enough pero ka amazing
                    talaga saim mga kaya himuon, always talaga na 100% ak pagka proud na ikaw ak girlfriend. Dire ko maenvision ak life na waray ka, and napakablessed ko na for 6 years adi ka la gihap kaupod ko.
                    Thankful ak na adi ak para mawitness tanan na events saim buhay, and hoping na matupad ta aton dreams together. Ikaw la ak love, always, I love you so much, and Happy 22nd Birthday to my only love.
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
        <hr />

      {/* Memory Cards Section */}
        <section className="relative">
          {memories.map((memory, index) => (
            <div
              key={index}
              className={`min-h-screen relative flex items-center justify-center px-6 py-24 ${
                index % 2 === 0 ? 'bg-pink-50' : 'bg-white'
              }`}
              data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
            >
            <div className="absolute inset-0 opacity-10">
                {/* Decorative background patterns */}
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-pink-300 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-rose-300 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className={`relative group ${index % 2 === 0 ? 'order-1' : 'order-1 lg:order-2'}`}
                    data-aos="zoom-in" data-aos-delay="200">
                  <MemoryCarousel images={memory.images} groupId={index} />
                  
                  {/* Keep the decorative elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-pink-100 rounded-full blur-2xl opacity-60"></div>
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-rose-100 rounded-full blur-2xl opacity-60"></div>
                </div>

                {/* Content Container */}
                <div className={`relative z-10 ${index % 2 === 0 ? 'order-2' : 'order-2 lg:order-1'}`}
                  data-aos="fade-up" data-aos-delay="400">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center shadow-xl transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                        <div className="text-white w-8 h-8">
                        {memory.icon}
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 my-6"
                        style={{fontFamily: 'Dancing Script, cursive'}}>
                        {memory.title}
                    </h2>

                    {/* Message */}
                    <p className="text-xl text-gray-600 leading-relaxed">
                        {memory.message}
                    </p>

                    {/* Decorative line */}
                    <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full my-2"></div>
                    </div>
                </div>
                </div>
            </div>

        ))}
        </section>
        <hr />
        {/* Birthday Wishes Section */}
        <section className="py-24 px-6 bg-gradient-to-b from-white to-pink-50" id="birthdayWishes" data-aos="fade-up">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16" data-aos="fade-down">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                  style={{fontFamily: 'Dancing Script, cursive'}}>
                Birthday Wishes
              </h2>
              <p className="text-xl text-gray-600">22 Messages for You</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishes.map((wish, index) => (
                <div 
                  key={index}
                  className={`group relative bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-2xl 
                  transition-all duration-500 hover:-translate-y-1 cursor-pointer
                  ${index === wishes.length - 1 && wishes.length % 3 === 1 ? 'lg:col-start-2' : ''}`}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  {/* Decorative background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-100/50 to-rose-100/50 rounded-xl 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Content */}
                  <div className="relative space-y-4">
                    {/* Message */}
                    <p className="text-lg text-gray-700 leading-relaxed italic group-hover:text-gray-900 
                                transition-colors duration-300">
                      "{wish.message}"
                    </p>

                    {/* Interactive elements */}
                    <div className="flex justify-between items-center">
                      <span className="text-2xl transform group-hover:scale-125 transition-transform duration-300">
                        {wish.emoji}
                      </span>
                      <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center 
                                    opacity-0 group-hover:opacity-100 transform translate-y-2 
                                    group-hover:translate-y-0 transition-all duration-300">
                        <Heart className="w-4 h-4 text-pink-500" />
                      </div>
                    </div>

                    {/* Decorative line */}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 
                                  group-hover:w-full transition-all duration-500"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <hr />

        <iframe
          data-testid="embed-iframe"
          style={{ borderRadius: "12px", margin: "auto", display: "block", paddingTop: "2rem", paddingBottom: "2rem" }}
          src="https://open.spotify.com/embed/track/2NxnWXho1vkCkuBijDyYNK?utm_source=generator"
          width="60%"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
          data-aos="fade-up"
        />

      {showReturnToTop && (
        <div 
          onClick={returnToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-pink-500 rounded-full shadow-lg hover:shadow-xl 
          hover:bg-pink-600 transition-all duration-300 cursor-pointer flex items-center justify-center 
          transform hover:scale-110 z-50"
          style={{
            animation: 'bounce 2s infinite'
          }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 10l7-7m0 0l7 7m-7-7v18" 
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default HappyBirthdayWebsite;