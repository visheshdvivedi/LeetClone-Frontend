import React from 'react';

import Header from "../parts/Header";
import Footer from "../parts/Footer";

import Stepper from '../parts/create-problem/Stepper';

const CreateNewProblem = () => {
    return (
        <>
            <Header />
            <div className='px-5 py-4 w-full h-full flex flex-row justify-center items-center gap-10'>
                <Stepper />
            </div>
            <Footer />
        </>
    )
}

export default CreateNewProblem