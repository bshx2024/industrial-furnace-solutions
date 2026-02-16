import React from 'react';

import Header from './components/Header';

import Footer from './components/Footer';

import { useLocation, Outlet } from 'react-router';

import { LanguageProvider } from './contexts/LanguageContext';



const ScrollToHashElement = () => {

    const { hash } = useLocation();



    React.useEffect(() => {

        if (hash) {

            const element = document.getElementById(hash.replace('#', ''));

            if (element) {

                setTimeout(() => {

                    element.scrollIntoView({ behavior: 'smooth' });

                }, 100);

            }

        } else {

            window.scrollTo(0, 0);

        }

    }, [hash]);



    return null;

};



const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        <div className="font-sans antialiased text-gray-900 bg-white selection:bg-furnace-500 selection:text-white flex flex-col min-h-screen">
            <ScrollToHashElement />
            <Header />
            <main className="flex-grow">
                {children || <Outlet />}
            </main>
            <Footer />
        </div>
    );
};





export default Layout;

