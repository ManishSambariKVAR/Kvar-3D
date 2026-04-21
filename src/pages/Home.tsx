import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import About from '../sections/About';
import Contact from '../sections/Contact';
import Features from '../sections/Features';
import Hero from '../sections/Hero';
import Products from '../sections/Products';

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (!hash) return;

    // Let the route render/layout settle first.
    const t = window.setTimeout(() => {
      const el = document.querySelector(hash);
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 50);

    return () => window.clearTimeout(t);
  }, [location.hash]);

  return (
    <>
      <Hero />
      <Products limit={8} showViewAll modelsOnly />
      <Features />
      <About />
      <Contact />
    </>
  );
}

