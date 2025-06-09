import React, { useEffect } from 'react';
import Banner from '../../components/Banner/Banner';
import Categories from '../../components/Categories/Categories';
import { useLocation } from 'react-router';

const Home = () => {

    const location = useLocation();
    console.log(location)

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

    return (
        <div>
            <section className='mb-36 mt-10'>
                <Banner />
            </section>
            <section id="categories">
                <Categories />
            </section>
        </div>
    );
};

export default Home;