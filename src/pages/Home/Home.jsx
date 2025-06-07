import React from 'react';
import Banner from '../../components/Banner/Banner';
import Categories from '../../components/Categories/Categories';

const Home = () => {
    return (
        <div>
            <section className='mb-36 mt-10'>
                <Banner/>
            </section>
            <Categories/>
        </div>
    );
};

export default Home;