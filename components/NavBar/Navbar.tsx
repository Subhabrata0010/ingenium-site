"use client"
// ======================== Imports ========================
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';
import AnimatedHamburgerButton from './Hamburger';
import { motion, AnimatePresence } from "framer-motion"


// =================== Nav Bar ===================
const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const currentRoute = usePathname();
  const divRef = useRef<HTMLDivElement>(null);


  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    // Check if the clicked or touched target is outside the div
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    setMenuOpen(false);
    // Add event listeners for both desktop (mousedown) and mobile (touchstart)
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    // Track scrolling to add shadow and background
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listeners on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentRoute]);


  // =================== Return ===================
  return (<>
    <nav 
      ref={divRef} 
      className={`fixed top-0 w-full pt-2 z-900 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 shadow-md shadow-slate-300 backdrop-blur-sm" 
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto flex items-center font-medium justify-between h-12 relative px-4 gap-8">

        {/* ========== Logo left ========== */}
        <div className="z-20 text-white text-lg w-fit">
          <Link href="/">
            <img src={"/images/aotlogo.svg"} alt="Logo" className="h-10 sm:h-10 transition-transform duration-300 hover:scale-110" />
          </Link>
        </div>
        <div className="z-20 text-white text-lg w-fit">
          <Link href="/">
            <img src={"/images/ing-logo.png"} alt="Logo" className="h-10 sm:h-10 transition-transform duration-300 hover:scale-110" />
          </Link>
        </div>


        {/* =================== Top Bar =================== */}
        <div className="lg:flex items-center gap-6 hidden font-medium mx-auto" >
          <LinksSection />
        </div>

        <div className="lg:hidden z-1000">
          <AnimatedHamburgerButton onToggle={toggleMenu} toggled={isMenuOpen} />
        </div>
      </div>


      {/* =================== Side Menu =================== */}
      <AnimatePresence>
        {isMenuOpen &&
          <motion.div 
            className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.div 
              className="bg-white p-8 h-screen w-64 max-w-[80%] absolute top-0 right-0 z-901"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-6 items-start mt-12">
                <LinksSection />
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </nav>
  </>);
};

export default Navbar;




{/* =================== Links =================== */ }
const LinksSection = () => {
  const currentRoute = usePathname();

  return (
    <>
      <Link
        href="/"
        className={`relative text-black text-base font-medium transition-all duration-300 hover:text-ingeniumbrand ${
          currentRoute == "/" 
            ? "text-ingeniumbrand after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-ingeniumbrand" 
            : "hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-ingeniumbrand hover:after:scale-x-100 hover:after:origin-left hover:after:transition-transform hover:after:duration-300 after:scale-x-0"
        }`}
      >
        Home
      </Link>
      <Link
        href="/utkarshi"
        className={`relative text-black text-base font-medium transition-all duration-300 hover:text-ingeniumbrand ${
          currentRoute == "/utkarshi" 
            ? "text-ingeniumbrand after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-ingeniumbrand" 
            : "hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-ingeniumbrand hover:after:scale-x-100 hover:after:origin-left hover:after:transition-transform hover:after:duration-300 after:scale-x-0"
        }`}
      >
        Utkarshi
      </Link>
      <Link
        href="/abohoman"
        className={`relative text-black text-base font-medium transition-all duration-300 hover:text-ingeniumbrand ${
          currentRoute == "/abohoman" 
            ? "text-ingeniumbrand after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-ingeniumbrand" 
            : "hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-ingeniumbrand hover:after:scale-x-100 hover:after:origin-left hover:after:transition-transform hover:after:duration-300 after:scale-x-0"
        }`}
      >
        Abohoman
      </Link>
      <Link
        href="/prayukti"
        className={`relative text-black text-base font-medium transition-all duration-300 hover:text-ingeniumbrand ${
          currentRoute == "/prayukti" 
            ? "text-ingeniumbrand after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-ingeniumbrand" 
            : "hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-ingeniumbrand hover:after:scale-x-100 hover:after:origin-left hover:after:transition-transform hover:after:duration-300 after:scale-x-0"
        }`}
      >
        Prayukti
      </Link>
      <Link
        href="/sarvagya"
        className={`relative text-black text-base font-medium transition-all duration-300 hover:text-ingeniumbrand ${
          currentRoute == "/sarvagya" 
            ? "text-ingeniumbrand after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-ingeniumbrand" 
            : "hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-ingeniumbrand hover:after:scale-x-100 hover:after:origin-left hover:after:transition-transform hover:after:duration-300 after:scale-x-0"
        }`}
      >
        Sarvagya
      </Link>
      <Link
        href="/archive"
        className={`relative text-black text-base font-medium transition-all duration-300 hover:text-ingeniumbrand ${
          currentRoute == "/archive" 
            ? "text-ingeniumbrand after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-ingeniumbrand" 
            : "hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-ingeniumbrand hover:after:scale-x-100 hover:after:origin-left hover:after:transition-transform hover:after:duration-300 after:scale-x-0"
        }`}
      >
        Archive
      </Link>
      <Link
        href="/editorial"
        className={`relative text-black text-base font-medium transition-all duration-300 hover:text-ingeniumbrand ${
          currentRoute == "/editorial" 
            ? "text-ingeniumbrand after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-ingeniumbrand" 
            : "hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-ingeniumbrand hover:after:scale-x-100 hover:after:origin-left hover:after:transition-transform hover:after:duration-300 after:scale-x-0"
        }`}
      >
        Editorial
      </Link>
    </>
  )
}