import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';


import { ROUTES } from '@/constants/routes';
import ApplicationForm from '@/components/forms/ApplicationForm';
import DealershipForm from '@/components/forms/DealershipForm';
import Logo from '@/components/common/Logo';

// Simple Modal wrapper for form overlays - Redesigned to be premium
function FormModal({ title, isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm">
      <div className="animate-dropdown-fade-in my-8 flex w-full max-w-3xl flex-col rounded-[24px] border border-white/60 bg-white/95 shadow-[0_24px_64px_rgba(15,23,42,0.18)] backdrop-blur-[16px]">
        <header className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            type="button"
            className="hover:text-gray-650 text-2xl font-semibold text-gray-400 transition-colors focus:outline-none"
          >
            &times;
          </button>
        </header>
        <div className="max-h-[70vh] overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScroll, setHasScroll] = useState(false);

  // Modals state
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isDealerOpen, setIsDealerOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setHasScroll(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLinkClass = ({ isActive }) =>
    `nav-link-premium ${isActive ? 'nav-link-premium-active' : ''}`;



  return (
    <>
      {/* Sticky parent wrapper to hold the floating navbar */}
      <div
        className={`duration-350 sticky top-0 z-40 w-full transition-all ${hasScroll ? 'pt-2' : 'pt-4 md:pt-6'}`}
      >
        <nav
          id="navbar"
          className={`duration-350 mx-auto w-[94%] max-w-7xl rounded-[20px] border transition-all md:rounded-[24px] ${
            hasScroll
              ? 'border-white/45 bg-white/85 px-6 py-2.5 shadow-[0_12px_48px_rgba(15,23,42,0.12)] backdrop-blur-[24px] dark:border-secondary/30 dark:bg-dark-bg/85 dark:shadow-[0_4px_30px_rgba(0, 208, 156,0.15)]'
              : 'border-white/45 bg-white/72 px-8 py-4 shadow-[0_8px_40px_rgba(15,23,42,0.08)] backdrop-blur-[20px] dark:border-secondary/20 dark:bg-dark-bg/60 dark:shadow-[0_4px_30px_rgba(0, 208, 156,0.1)]'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <NavLink
              to={ROUTES.HOME}
              className="group flex items-center"
              onClick={closeMenu}
            >
              <Logo
                className={`h-auto object-contain transition-all duration-350 ${
                  hasScroll ? 'w-32' : 'w-40'
                }`}
              />

            </NavLink>

            {/* Desktop Navigation Links */}
            <div className="hidden items-center gap-7 lg:flex">
              <NavLink to={ROUTES.HOME} className={getLinkClass}>
                Home
              </NavLink>
              <NavLink to={ROUTES.ABOUT} className={getLinkClass}>
                About
              </NavLink>
              <NavLink to={ROUTES.SERVICES} className={getLinkClass}>
                Services
              </NavLink>

              {/* Dealership Form Trigger */}
              <button
                onClick={() => setIsDealerOpen(true)}
                type="button"
                className="nav-link-premium text-left text-sm font-semibold transition-colors"
              >
                Dealership Form
              </button>

              <NavLink to={ROUTES.CONTACT} className={getLinkClass}>
                Contact Us
              </NavLink>






            </div>

            {/* Right Desktop Actions Block */}
            <div className="hidden items-center gap-5 lg:flex">




              {/* Apply Now Pill Button */}
              <button
                onClick={() => setIsApplyOpen(true)}
                type="button"
                className="duration-250 group flex h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00D09C] to-[#00D09C] px-6 text-sm font-bold text-white shadow-[0_4px_16px_rgba(0, 208, 156,0.18)] transition-all hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_8px_24px_rgba(0, 208, 156,0.28)] focus:outline-none"
              >
                <span>Apply Now</span>
                <FiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Mobile Animated Hamburger Menu Toggle */}
            <div className="flex items-center gap-3 lg:hidden">
              
              <button
                onClick={toggleMenu}
                className="p-2 text-gray-600 transition-colors duration-200 hover:text-secondary dark:text-vibranium dark:hover:text-secondary focus:outline-none"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
                type="button"
              >
                <div className="relative flex h-6 w-6 items-center justify-center">
                  <span
                    className={`absolute block h-0.5 w-5 bg-current transition-all duration-300 ${
                      isMenuOpen ? 'rotate-45' : '-translate-y-1.5'
                    }`}
                  />
                  <span
                    className={`absolute block h-0.5 w-5 bg-current transition-all duration-300 ${
                      isMenuOpen ? 'opacity-0' : ''
                    }`}
                  />
                  <span
                    className={`absolute block h-0.5 w-5 bg-current transition-all duration-300 ${
                      isMenuOpen ? '-rotate-45' : 'translate-y-1.5'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Panel - Frosted absolute card layout */}
          {isMenuOpen && (
            <div className="animate-mobile-menu-in absolute left-0 right-0 top-full z-50 mt-2 w-full origin-top px-4 lg:hidden">
              <div className="bg-white/92 flex flex-col gap-4 rounded-[20px] border border-white/50 p-5 shadow-[0_16px_48px_rgba(15,23,42,0.16)] backdrop-blur-[20px] dark:bg-dark-bg/95 dark:border-secondary/40 dark:shadow-[0_16px_48px_rgba(0, 208, 156,0.16)]">
                <div className="flex flex-col gap-1">
                  <NavLink
                    to={ROUTES.HOME}
                    className={({ isActive }) =>
                      `rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                        isActive
                          ? 'bg-secondary/10 text-secondary'
                          : 'text-gray-700 hover:bg-secondary/5'
                      }`
                    }
                    onClick={closeMenu}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to={ROUTES.ABOUT}
                    className={({ isActive }) =>
                      `rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                        isActive
                          ? 'bg-secondary/10 text-secondary'
                          : 'text-gray-700 hover:bg-secondary/5'
                      }`
                    }
                    onClick={closeMenu}
                  >
                    About
                  </NavLink>
                  <NavLink
                    to={ROUTES.SERVICES}
                    className={({ isActive }) =>
                      `rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                        isActive
                          ? 'bg-secondary/10 text-secondary'
                          : 'text-gray-700 hover:bg-secondary/5'
                      }`
                    }
                    onClick={closeMenu}
                  >
                    Services
                  </NavLink>
                  <button
                    onClick={() => {
                      setIsDealerOpen(true);
                      closeMenu();
                    }}
                    type="button"
                    className="rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-gray-700 transition-colors hover:bg-secondary/5"
                  >
                    Dealership Form
                  </button>
                  <NavLink
                    to={ROUTES.CONTACT}
                    className={({ isActive }) =>
                      `rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                        isActive
                          ? 'bg-secondary/10 text-secondary'
                          : 'text-gray-700 hover:bg-secondary/5'
                      }`
                    }
                    onClick={closeMenu}
                  >
                    Contact Us
                  </NavLink>
                </div>



                <div className="flex flex-col gap-3 border-t border-gray-100 pt-4">


                  {/* Apply Now Pill CTA */}
                  <button
                    onClick={() => {
                      setIsApplyOpen(true);
                      closeMenu();
                    }}
                    type="button"
                    className="group flex h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00D09C] to-[#00D09C] px-6 text-sm font-bold text-white shadow-[0_4px_16px_rgba(0, 208, 156,0.18)]"
                  >
                    <span>Apply Now</span>
                    <FiArrowRight className="h-4 w-4" />
                  </button>

                  {/* Pay EMI */}

                </div>
              </div>
            </div>
          )}
        </nav>
      </div>

      {/* Form overlay modals */}
      <FormModal title="Apply Now" isOpen={isApplyOpen} onClose={() => setIsApplyOpen(false)}>
        <ApplicationForm />
      </FormModal>

      <FormModal
        title="Dealership Form"
        isOpen={isDealerOpen}
        onClose={() => setIsDealerOpen(false)}
      >
        <DealershipForm onSuccess={() => setIsDealerOpen(false)} />
      </FormModal>
    </>
  );
}

export default Navbar;
