import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Solutions from './pages/Solutions';
import CaseStudies from './pages/CaseStudies';
import PerformanceList from './pages/PerformanceList';
import HeroCases from './pages/HeroCases';
import AboutContact from './pages/AboutContact';
import { useLocation } from 'react-router-dom';

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

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToHashElement />
      <div className="font-sans antialiased text-gray-900 bg-white selection:bg-furnace-500 selection:text-white flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/hero-cases" element={<HeroCases />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/about" element={<AboutContact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;