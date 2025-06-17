import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion, AnimatePresence } from 'motion/react';
import { FaRocket, FaGlasses, FaHome, FaArrowRight, FaEye } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './slider.css';
import holoGlass from '../../assets/videos/Holosmart Glasses Video Ready.mp4';
import hoverBoard from '../../assets/videos/Hoverboard Video Generation Complete.mp4';
import smartHomeHub from '../../assets/videos/Video Regeneration Request Fulfilled.mp4';

// Video data array with unique styling and button configs
const videoSlides = [
  {
    src: holoGlass,
    title: 'HoloSmart Glasses',
    tagline: 'See the Future, Wear the Galaxy',
    icon: <FaGlasses className="text-4xl text-purple-400" />,
    duration: 8000, // 8 seconds
    overlayClass: 'bg-gradient-to-b from-purple-900/50 to-black/70',
    titleClass: 'text-3xl md:text-5xl text-white font-bold drop-shadow-[0_0_10px_rgba(124,58,237,0.8)]',
    taglineClass: 'text-lg md:text-2xl text-purple-300 font-semibold mb-6',
    button: {
      text: 'Discover Vision',
      className: 'btn btn-primary bg-purple-600 hover:bg-purple-700 text-white border-none px-8 py-3 flex items-center gap-2 shadow-[0_0_15px_rgba(124,58,237,0.5)]',
      icon: <FaEye />,
    },
},
  {
    src: hoverBoard,
    title: 'Quantum Hoverboards',
    tagline: 'Ride the Wave of Tomorrow',
    icon: <FaRocket className="text-4xl text-yellow-300" />,
    duration: 10000, // 10 seconds
    overlayClass: 'bg-gradient-to-r from-black/60 to-yellow-900/40',
    titleClass: 'text-3xl md:text-5xl text-yellow-400 font-extrabold tracking-wider drop-shadow-[0_2px_5px_rgba(251,191,36,0.6)]',
    taglineClass: 'text-lg md:text-2xl text-white font-medium mb-6 italic',
    button: {
      text: 'Ride Now',
      className: 'btn btn-accent bg-yellow-500 hover:bg-yellow-600 text-black rounded-full px-6 py-2 flex items-center gap-2',
      icon: <FaArrowRight />,
    },
  },
  {
    src: smartHomeHub,
    title: 'Galactic Smart Home Hub',
    tagline: 'Control Your Universe',
    icon: <FaHome className="text-4xl text-white" />,
    duration: 7000, // 7 seconds
    overlayClass: 'bg-gradient-to-t from-black/70 to-purple-800/40',
    titleClass: 'text-3xl md:text-5xl text-white font-serif font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]',
    taglineClass: 'text-lg md:text-2xl text-yellow-200 font-light mb-6',
    button: {
      text: 'Connect Now',
      className: 'btn btn-ghost text-white border-white hover:bg-white/20 px-6 py-2 flex items-center gap-2',
      icon: <FaHome />,
    },
  },
];

// Animation variants for each slide
const animationVariants = [
  {
    // HoloSmart Glasses
    title: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut', type: 'spring', stiffness: 100 } },
      exit: { opacity: 0, scale: 0.7, transition: { duration: 0.4 } },
    },
    tagline: {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2, ease: 'easeOut' } },
      exit: { opacity: 0, x: 50, transition: { duration: 0.3 } },
    },
    icon: {
      initial: { opacity: 0, rotate: -180 },
      animate: { opacity: 1, rotate: 0, transition: { duration: 0.6, delay: 0.1, type: 'spring', stiffness: 80 } },
      exit: { opacity: 0, rotate: 180, transition: { duration: 0.3 } },
    },
    button: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.4, type: 'spring', stiffness: 120 } },
      exit: { opacity: 0, scale: 0.6, transition: { duration: 0.3 } },
      whileHover: { scale: 1.1, boxShadow: '0 0 20px rgba(124,58,237,0.7)' },
    },
  },
  {
    // Quantum Hoverboards
    title: {
      initial: { opacity: 0, scale: 0.9, skewX: 20 },
      animate: { opacity: 1, scale: 1, skewX: 0, transition: { duration: 0.5, ease: 'easeIn', type: 'spring', stiffness: 90 } },
      exit: { opacity: 0, scale: 1.2, filter: 'blur(5px)', transition: { duration: 0.4 } },
    },
    tagline: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2, type: 'spring', bounce: 0.4 } },
      exit: { opacity: 0, y: 50, transition: { duration: 0.3 } },
    },
    icon: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1, type: 'spring', stiffness: 100 } },
      exit: { opacity: 0, y: -50, transition: { duration: 0.3 } },
    },
    button: {
      initial: { opacity: 0, rotateY: 90 },
      animate: { opacity: 1, rotateY: 0, transition: { duration: 0.5, delay: 0.4, ease: 'easeOut' } },
      exit: { opacity: 0, rotateY: -90, transition: { duration: 0.3 } },
      whileHover: { scale: 1.15, rotate: 5 },
    },
  },
  {
    // Galactic Smart Home Hub
    title: {
      initial: { opacity: 0, rotateX: 90 },
      animate: { opacity: 1, rotateX: 0, transition: { duration: 0.7, ease: 'easeOut', type: 'spring', stiffness: 80 } },
      exit: { opacity: 0, rotateX: -90, transition: { duration: 0.4 } },
    },
    tagline: {
      initial: { opacity: 0, scale: 0.8, rotate: 10 },
      animate: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.5, delay: 0.2, type: 'spring', stiffness: 70 } },
      exit: { opacity: 0, scale: 0.8, rotate: -10, transition: { duration: 0.3 } },
    },
    icon: {
      initial: { opacity: 0, scale: 0.5 },
      animate: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.1, type: 'spring', stiffness: 100, damping: 10 } },
      exit: { opacity: 0, scale: 0.5, transition: { duration: 0.3 } },
    },
    button: {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.4, ease: 'easeOut' } },
      exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
      whileHover: { borderColor: '#FBBF24', boxShadow: '0 0 15px rgba(251,191,36,0.5)' },
    },
  },
];

const Slider = () => {
  const [error, setError] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [loadedVideos, setLoadedVideos] = useState({});
  const videoRefs = useRef(videoSlides.map(() => React.createRef()));

  const handleSlideChange = (swiper) => {
    setActiveSlide(swiper.activeIndex);
    videoRefs.current.forEach((ref, index) => {
      if (ref.current) {
        if (index === swiper.activeIndex) {
          ref.current.play().catch(() => setError(`Failed to play ${videoSlides[index].title}`));
        } else {
          ref.current.pause();
        }
      }
    });
  };

  return (
    <div className="relative w-full h-[500px] md:h-[600px] p-6 rounded-3xl bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 z-50">
          <p className="text-lg text-gray-200">Error: {error}. Please try again later.</p>
        </div>
      )}
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        onSlideChange={handleSlideChange}
        className="w-full h-full rounded-3xl"
      >
        {videoSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full video-container">
              {/* Loading placeholder */}
              <AnimatePresence>
                {!loadedVideos[index] && (
                  <motion.div
                    className="absolute inset-0 bg-black flex items-center justify-center z-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-white text-lg font-semibold">Loading...</p>
                  </motion.div>
                )}
              </AnimatePresence>
              <video
                ref={videoRefs.current[index]}
                className={`absolute top-0 left-0 w-full h-full object-cover ${loadedVideos[index] && activeSlide === index ? '' : 'opacity-0'
                  }`}
                src={slide.src}
                autoPlay={activeSlide === index}
                muted
                loop
                playsInline
                preload="metadata"
                onCanPlay={() => setLoadedVideos((prev) => ({ ...prev, [index]: true }))}
                onError={() => setError(`Failed to load ${slide.title}`)}
              >
                Your browser does not support the video tag.
              </video>
              <AnimatePresence>
                {activeSlide === index && (
                  <motion.div
                    className={`overlay flex flex-col items-center justify-center text-center ${slide.overlayClass}`}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={animationVariants[index].title}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <motion.div variants={animationVariants[index].icon}>
                        {slide.icon}
                      </motion.div>
                      <motion.h1 className={slide.titleClass} variants={animationVariants[index].title}>
                        {slide.title}
                      </motion.h1>
                    </div>
                    <motion.p className={slide.taglineClass} variants={animationVariants[index].tagline}>
                      {slide.tagline}
                    </motion.p>
                    <motion.a
                      href={slide.button.href}
                      className={slide.button.className}
                      variants={animationVariants[index].button}
                      whileHover="whileHover"
                    >
                      {slide.button.text} {slide.button.icon}
                    </motion.a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;