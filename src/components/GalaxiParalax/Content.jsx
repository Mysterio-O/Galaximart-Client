import { useScroll, useTransform, motion, useMotionValueEvent, useMotionTemplate, useSpring } from 'motion/react';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router';

const ContentItem = ({ content }) => {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const translateContent = useSpring(
        useTransform(scrollYProgress, [0, 1], [-200, 200]),
        {
            stiffness: 100,
            damping: 30,
            mass: 1
        }
    )
    const opacityContent = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

    const blur = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0, 5]);
    const filter = useMotionTemplate`blur(${blur}px)`;

    const scale = useTransform(scrollYProgress, [0.5, 1], [1, 0.8])

    // useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    //     console.log(`Scroll progress for ${content.title}:`, latest);
    // });

    return (
        <div
            ref={ref}
            className="grid grid-cols-2 p-20 md:p-40 items-center gap-4 lg:gap-20 mb-64"
            key={content?.id}
        >
            <motion.div
                style={{
                    filter,
                    scale
                }}
                className="space-y-5">
                <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-white">{content?.title}</h2>
                <p className="text-xs md:text-lg text-neutral-400">{content?.details}</p>
            </motion.div>
            <motion.div
                style={{
                    y: translateContent,
                    opacity: opacityContent,
                }}
                className="rounded-2xl"
            >
                <img className='rounded-2xl' src={content?.image} alt={content?.title} />
            </motion.div>
        </div>
    );
};

const Content = () => {
    const containerRef = useRef(null);

    const backgrounds = ['#343434', '#00193b', '#05291c'];

    const [background, setBackground] = useState(backgrounds[0]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        const finalValue = Math.floor(latest * backgrounds.length);
        setBackground(backgrounds[finalValue]);
        // console.log(`Scroll progress for containerRef->`, latest, 'finalValue->', finalValue);
    });

    const contents = [
        {
            id: 1,
            title: '🌟 Discover Our Journey',
            details:
                'Dive into the story of how we started, driven by a passion for innovation and a vision to transform the ordinary into the extraordinary. Our journey is one of bold ideas, relentless dedication, and a commitment to creating experiences that inspire and captivate.',
            image: 'https://i.ibb.co/sJ58yjxf/Gemini-Generated-Image-l4gw4el4gw4el4gw.png',
        },
        {
            id: 2,
            title: '🚀 Unleash Your Potential',
            details:
                'Empower yourself with tools and resources designed to elevate your skills and fuel your ambitions. Whether you’re chasing dreams or building new ones, our platform offers endless possibilities to explore, learn, and grow.',
            image: 'https://i.ibb.co/vvYThwsS/Gemini-Generated-Image-n7s83rn7s83rn7s8.png',
        },
        {
            id: 3,
            title: '🌍 Connect with the World',
            details:
                'Join a global community where ideas converge and connections flourish. From sharing stories to sparking collaborations, our platform brings people together to create something bigger than themselves.',
            image: 'https://i.ibb.co/0yp0PSrP/Gemini-Generated-Image-5rnnww5rnnww5rnn.png',
        },
    ];

    return (
        <motion.div
            ref={containerRef}
            style={{
                background
            }}
            className="md:p-20">
            {contents.map((content) => (
                <ContentItem key={content.id} content={content} />
            ))}

            <div className="flex justify-center items-center py-10">
                <Link to="/">
                    <motion.button
                        className="px-6 py-3 text-base md:text-lg font-bold text-white bg-neutral-800 border-2 border-teal-400 rounded-xl hover:bg-teal-400 hover:text-neutral-900 transition-colors duration-300"
                        whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(45, 212, 191, 0.5)" }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        Back to Home
                    </motion.button>
                </Link>
            </div>

        </motion.div>
    );
};

export default Content;