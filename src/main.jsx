import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import './index.css'
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify'
import AuthProvider from './contexts/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <ToastContainer 
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        >
        </ToastContainer>
        <AuthProvider>
            <App />
        </AuthProvider>
    </>
)
