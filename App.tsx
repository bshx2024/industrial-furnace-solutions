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

const App: React.FC = () => {
  return (
    <Router>
      <div className="font-sans antialiased text-gray-900 bg-white selection:bg-furnace-500 selection:text-white flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/portfolio" element={<PerformanceList />} />
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