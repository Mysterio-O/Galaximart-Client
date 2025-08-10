import { motion, useAnimation } from 'motion/react';
import { FaLock, FaHome, FaExclamationTriangle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

const ForbiddenPage = () => {
  const navigate = useNavigate();
  const [intensity, setIntensity] = useState(0);
  const controls = useAnimation();
  const warningControls = useAnimation();
  const bgControls = useAnimation();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Start intensity buildup
  useEffect(() => {
    const timer = setInterval(() => {
      setIntensity(prev => {
        const newIntensity = prev + 0.01;
        if (newIntensity >= 1) {
          clearInterval(timer);
          triggerBreak();
        }
        return newIntensity;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  // Update animations based on intensity
  useEffect(() => {
    controls.start({
      rotate: [0, 5 * intensity, -5 * intensity, 0],
      transition: {
        duration: 0.7 / (intensity + 0.5),
        repeat: Infinity,
        repeatType: "mirror"
      }
    });

    warningControls.start({
      opacity: [0, 0.2 * intensity, 0.5 * intensity, 0.8 * intensity, intensity, 0.8 * intensity, 0.5 * intensity, 0.2 * intensity, 0],
      transition: {
        duration: 5 / (intensity + 0.5),
        repeat: Infinity,
        repeatType: "reverse"
      }
    });
  }, [intensity, controls, warningControls]);

  const triggerBreak = async () => {
    // Final shake before breaking
    await controls.start({
      rotate: [-30, 30, -30, 30, -30, 0],
      transition: { duration: 0.5 }
    });

    // Lock breaks
    await controls.start({
      scale: 0,
      rotate: 180,
      transition: { duration: 0.3 }
    });

    // Screen turns red
    await bgControls.start({
      backgroundColor: 'rgba(239, 68, 68, 0.8)',
      transition: { duration: 0.5 }
    });

    // Wait a moment then navigate home
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <motion.div
      animate={bgControls}
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#1a1a2e] dark:bg-gray-50 text-gray-100 dark:text-gray-800 transition-colors duration-300 overflow-hidden"
    >
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            transition: {
              duration: 2,
              repeat: Infinity
            }
          }}
          className="absolute w-64 h-64 bg-cyan-500/10 dark:bg-cyan-400/10 rounded-full filter blur-xl top-1/4 left-1/4"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            transition: {
              duration: 2,
              delay: 0.5,
              repeat: Infinity
            }
          }}
          className="absolute w-64 h-64 bg-indigo-500/10 dark:bg-indigo-400/10 rounded-full filter blur-xl bottom-1/4 right-1/4"
        />
      </div>

      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-md w-full p-8 rounded-xl backdrop-blur-sm border border-cyan-500/30 dark:border-gray-200 bg-gray-900/80 dark:bg-white/90 shadow-lg shadow-[0_0_20px_rgba(34,211,238,0.2)] dark:shadow-[0_0_20px_rgba(156,163,175,0.2)] relative overflow-hidden"
      >
        {/* Warning triangle background */}
        <motion.div
          animate={warningControls}
          className="absolute inset-0 flex items-center justify-center text-red-400 dark:text-red-500 z-0"
        >
          <FaExclamationTriangle size={120} />
        </motion.div>

        <div className="relative z-10">
          {/* Lock icon with increasing shake */}
          <motion.div
            animate={controls}
            initial={{ scale: 1 }}
            className="mx-auto w-24 h-24 flex items-center justify-center rounded-full mb-6 bg-red-500/20 dark:bg-red-500/10 text-red-400 dark:text-red-500"
          >
            <FaLock size={48} />
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-4xl font-bold text-center mb-4 orbitron text-red-400 dark:text-red-500"
          >
            403 - Forbidden
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-center mb-8 text-gray-300 dark:text-gray-600"
          >
            Unauthorized access detected! Security protocols engaged.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all bg-cyan-600/80 hover:bg-cyan-500/90 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-white"
            >
              <FaHome /> Emergency Exit
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all bg-gray-800 hover:bg-gray-700 dark:bg-gray-100 dark:hover:bg-gray-200 border border-gray-700 dark:border-gray-200"
            >
              Request Access
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating warning triangles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100,
            y: Math.random() * 100,
            opacity: 0,
            rotate: Math.random() * 360
          }}
          animate={{
            x: [null, Math.random() * 100],
            y: [null, Math.random() * 100],
            opacity: [0, 0.4 * intensity, 0],
            rotate: [null, Math.random() * 360],
            transition: {
              duration: 5 + Math.random() * 15,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
          className="fixed text-red-400/30 dark:text-red-500/30 pointer-events-none z-0"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${20 + Math.random() * 30}px`
          }}
        >
          <FaExclamationTriangle />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ForbiddenPage;