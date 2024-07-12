import React from 'react';

import Header from '../parts/Header';
import Footer from '../parts/Footer';

import HeroDiv from '../parts/HomePage/HeroDiv';
import FeatureSection from '../parts/HomePage/FeatureSection';
import HowItWorkSection from '../parts/HomePage/HowItWorkSection';
import AboutDeveloperSection from '../parts/HomePage/AboutDeveloperSection';

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