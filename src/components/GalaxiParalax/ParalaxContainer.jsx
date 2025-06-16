import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Content from './Content';
import SplitText from './SplitText';

const ParalaxContainer = () => {

    const [isOnTheScreen, setIsOnTheScreen] = useState(true);
    const [contentOnTheScreen, setContentOnTheScreen] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsOnTheScreen(false);
        }, 5000);

        setTimeout(() => {
            setContentOnTheScreen(true)
        }, 6500);

    }, [])

    const headingVariant = {
        initial: { opacity: 0, scale: 0.5 },
        animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
        exit: { opacity: 0, scale: 0.5, transition: { duration: 1 } }
    }

    return (
        <div className='min-h-screen bg-neutral-900 flex justify-center items-center'>
            <AnimatePresence>
                {
                    isOnTheScreen && <motion.h2
                        variants={headingVariant}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className='text-5xl text-accent-content'>
                        <SplitText
                            text="Welcome to Parallax!"
                            className="text-4xl font-semibold text-center"
                            delay={100}
                            duration={0.6}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            textAlign="center"
                        />
                        </motion.h2>
                }
            </AnimatePresence>

            <AnimatePresence>
                {
                    contentOnTheScreen && <Content />
                }
            </AnimatePresence>

        </div>
    );
};

export default ParalaxContainer;