import React from 'react';

import Header from '../parts/Header';
import Footer from '../parts/Footer';
import SearchFilters from '../parts/problems/SearchFilters';

const ProblemsPage = () => {
    return (
        <>
            <Header />
            <div className='px-10 flex flex-col'>
                <SearchFilters />
            </div>
            <Footer />
        </>
    )
}

export default ProblemsPage