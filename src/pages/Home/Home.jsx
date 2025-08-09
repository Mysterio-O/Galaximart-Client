import React, { useEffect, useRef } from 'react';
import Banner from '../../components/Banner/Banner';
import Categories from '../../components/Categories/Categories';
import { useLocation } from 'react-router';
import GalaxiParalax from '../../components/GalaxiParalax/GalaxiParalax';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import Lanyard from '../../components/Lanyard/Lanyard'
import InfiniteScroll from '../../components/TopProducts/InfiniteScroll';
import DecryptedText from '../../components/DecryptedText/DecryptedText';


const Home = () => {

    const location = useLocation();
    // console.log(location)

    useEffect(()=>{
        document.title='Home | GalaxiMart'
    },[])

    useEffect(() => {
        if (location.hash === '#categories') {
            const element = document.getElementById('categories');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            } else {
                setTimeout(() => {
                    const retryElement = document.getElementById('categories');
                    if (retryElement) {
                        retryElement.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 500);
            }
        }
    }, [location])

    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    })

    const opacityContent = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
    const translateContent = useSpring(
        useTransform(scrollYProgress, [0, 1], [-200, 50]),
        {
            stiffness: 100,
            damping: 30,
            mass: 1
        }
    )

    const items = [
        {
            content: <div className="flex gap-2">
                <div className='w-1/2'>
                    <img className="w-32 h-32 p-2" src="https://i.ibb.co/0VfYjZfb/the-bottles-come-with-a-protective-spout-cover-and-lock-that-helps-keep-out-dirt-and-germs-and-also.webp" />
                </div>
                <div className="w-1/2 text-center">
                    <h2 className="text-lg font-bold text-cyan-200">Water Bottle Apple</h2>
                    <p className="text-xs text-neutral-400 font-light">Typically made from stainless steel or BPA-free plastic, ensuring durability and safety for hot or cold beverages.</p>
                </div>
            </div>
        },
        {
            content: <div className="flex gap-2">
                <div className='w-1/2'>
                    <img className="w-32 h-32 p-2" src="https://i.ibb.co/VcH82Tm2/NG-WA-2016-world-atlas-85620-93964.jpg" />
                </div>
                <div className="w-1/2 text-center">
                    <h2 className="text-lg font-bold text-cyan-200">World Atlas</h2>
                    <p className="text-xs text-neutral-400 font-light">Features detailed political, physical, and thematic maps of the world, updated with the latest geographic and political data.</p>
                </div>
            </div>
        },
        {
            content: <div className="flex gap-2">
                <div className='w-1/2'>
                    <img className="w-32 h-32 p-2" src="https://i.ibb.co/9kSscrYs/download.jpg" />
                </div>
                <div className="w-1/2 text-center">
                    <h2 className="text-lg font-bold text-cyan-200">Running Shoes Nike</h2>
                    <p className="text-xs text-neutral-400 font-light">Experience superior comfort and performance with these limited edition running shoes, engineered for all terrains.</p>
                </div>
            </div>
        },
        {
            content: <div className="flex gap-2">
                <div className='w-1/2'>
                    <img className="w-32 h-32 p-2" src="https://i.ibb.co/8tkVDxN/images.jpg" />
                </div>
                <div className="w-1/2 text-center">
                    <h2 className="text-lg font-bold text-cyan-200">Yoga Mat</h2>
                    <p className="text-xs text-neutral-400 font-light">A top-rated yoga mat providing excellent grip and cushioning for all your fitness routines.</p>
                </div>
            </div>
        },
        {
            content: <div className="flex gap-2">
                <div className='w-1/2'>
                    <img className="w-32 h-32 p-2" src="https://i.ibb.co/Cs27myzt/download.jpg" />
                </div>
                <div className="w-1/2 text-center">
                    <h2 className="text-lg font-bold text-cyan-200">Camping Lantern Black Diamond</h2>
                    <p className="text-xs text-neutral-400 font-light">Provides up to 250–400 lumens (e.g., Black Diamond Moji), with adjustable settings for dimming or strobe modes, illuminating campsites effectively.</p>
                </div>
            </div>
        },
        {
            content: <div className="flex gap-2">
                <div className='w-1/2'>
                    <img className="w-32 h-32 p-2" src="https://i.ibb.co/TDrVZzkf/download.jpg" />
                </div>
                <div className="w-1/2 text-center">
                    <h2 className="text-lg font-bold text-cyan-200">Portable Camping Chair Helinox</h2>
                    <p className="text-xs text-neutral-400 font-light">Weighs 1–2 pounds (e.g., Helinox Chair One), with a collapsible aluminum frame for easy transport in a carry bag.</p>
                </div>
            </div>
        },
        {
            content: <div className="flex gap-2">
                <div className='w-1/2'>
                    <img className="w-32 h-32 p-2" src="https://i.ibb.co/7t97jGk1/images.jpg" />
                </div>
                <div className="w-1/2 text-center">
                    <h2 className="text-lg font-bold text-cyan-200">Board Game: Catan</h2>
                    <p className="text-xs text-neutral-400 font-light">A strategy game for 3–4 players (ages 10+), involving resource management (wood, wheat, ore, etc.) to build settlements, roads, and cities, with games lasting 60–90 minutes.</p>
                </div>
            </div>
        },
        {
            content: <div className="flex gap-2">
                <div className='w-1/2'>
                    <img className="w-32 h-32 p-2" src="https://i.ibb.co/vCKqJXGj/634d2abdb0c5e97c65426f92-conair-reflections-led-lighted-vanity.jpg" />
                </div>
                <div className="w-1/2 text-center">
                    <h2 className="text-lg font-bold text-cyan-200">LED Makeup Mirror Conair</h2>
                    <p className="text-xs text-neutral-400 font-light">An LED makeup mirror with adjustable lighting, made with eco-friendly materials for flawless application.</p>
                </div>
            </div>
        },
        {
            content: <div className="flex gap-2">
                <div className='w-1/2'>
                    <img className="w-32 h-32 p-2" src="https://i.ibb.co/rR8Fb9Ck/download.jpg" />
                </div>
                <div className="w-1/2 text-center">
                    <h2 className="text-lg font-bold text-cyan-200">Facial Cleansing Brush Foreo</h2>
                    <p className="text-xs text-neutral-400 font-light">Uses up to 8,000 pulsations per minute (e.g., For…rt, oil, and makeup residue for deeper cleansing.)</p>
                </div>
            </div>
        },
        {
            content: <div className="flex gap-2">
                <div className='w-1/2'>
                    <img className="w-32 h-32 p-2" src="https://i.ibb.co/3yHG8Vh6/download.jpg" />
                </div>
                <div className="w-1/2 text-center">
                    <h2 className="text-lg font-bold text-cyan-200">Portable Grill</h2>
                    <p className="text-xs text-neutral-400 font-light">Lightweight (14–30 pounds) with foldable legs and…, ideal for camping, tailgating, or backyard use.</p>
                </div>
            </div>
        }
    ];

    return (
        <div>
            <section className='mb-20'>
                <Banner />
            </section>
            <section id="categories">
                <Categories />
            </section>
            <section>
                <GalaxiParalax />
            </section>
            <section>
                <div
                    ref={ref}
                >
                    <motion.div
                        style={{
                            opacity: opacityContent,
                            y: translateContent
                        }}
                        className='p-10'
                    >
                        <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
                    </motion.div>
                </div>
            </section>
            <section>
                <h2 className="text-4xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-500 to-violet-500 tracking-tighter drop-shadow-[0_0_8px_rgba(139,92,246,0.5)] orbitron">
                    <div style={{ marginTop: '4rem' }}>
                        <DecryptedText
                            text="Our Best Selling Products..."
                            animateOn="view"
                            revealDirection="center"
                        />
                    </div>
                </h2>
                <div
                    className="max-w-6xl mx-auto rounded-2xl py-10 mb-20"
                    style={{ height: '500px', position: 'relative' }}>

                    <InfiniteScroll
                        items={items}
                        isTilted={true}
                        tiltDirection='left'
                        autoplay={true}
                        autoplaySpeed={0.5}
                        autoplayDirection="down"
                        pauseOnHover={true}
                    />
                </div>
            </section>
        </div>
    );
};

export default Home;