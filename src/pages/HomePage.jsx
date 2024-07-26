import React from 'react';

import Header from '../parts/Header';
import Footer from '../parts/Footer';

import HeroDiv from '../parts/home/HeroDiv';
import FeatureSection from '../parts/home/FeatureSection';
import HowItWorkSection from '../parts/home/HowItWorkSection';
import AboutDeveloperSection from '../parts/home/AboutDeveloperSection';

const HomePage = () => {
    return (
        <div>
            <Header />
            <HeroDiv />
            <FeatureSection />
            <HowItWorkSection />
            <AboutDeveloperSection />
            <Footer />
        </div>
    )
}

export default HomePage