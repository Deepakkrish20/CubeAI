import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FiArrowRight, FiChevronDown } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';


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
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsMoreOpen(false);
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
        className={`duration-350 sticky top-0 z-40 w-full transition-all ${hasScroll ? 'pt-1.5' : 'pt-3 md:pt-4'}`}
      >
        <nav
          id="navbar"
          className={`duration-350 relative mx-auto w-[94%] max-w-7xl rounded-[16px] border transition-all md:rounded-[20px] ${
            hasScroll
              ? 'border-white/45 bg-white/85 px-5 py-2 shadow-[0_12px_48px_rgba(15,23,42,0.12)] backdrop-blur-[24px] dark:border-secondary/30 dark:bg-dark-bg/85 dark:shadow-[0_4px_30px_rgba(0, 208, 156,0.15)]'
              : 'border-white/45 bg-white/72 px-6 py-2.5 shadow-[0_8px_40px_rgba(15,23,42,0.08)] backdrop-blur-[20px] dark:border-secondary/20 dark:bg-dark-bg/60 dark:shadow-[0_4px_30px_rgba(0, 208, 156,0.1)]'
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
                  hasScroll ? 'w-28' : 'w-36'
                }`}
              />

            </NavLink>

            {/* Desktop Navigation Links */}
            <div className="hidden items-center gap-6 lg:flex">
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
                className="nav-link-premium text-left text-sm font-semibold transition-colors focus:outline-none cursor-pointer"
              >
                Dealership Form
              </button>

              {/* Dropdown Menu "More" */}
              <div 
                className="relative"
                onMouseEnter={() => setIsMoreOpen(true)}
                onMouseLeave={() => setIsMoreOpen(false)}
              >
                <button
                  type="button"
                  className="nav-link-premium flex items-center gap-1 text-sm font-semibold transition-colors focus:outline-none cursor-pointer"
                >
                  <span>More</span>
                  <FiChevronDown className={`h-4 w-4 transition-transform duration-250 ${isMoreOpen ? 'rotate-180' : ''}`} />
                </button>
                {isMoreOpen && (
                  <div className="absolute top-full left-0 z-50 mt-1.5 w-48 rounded-[16px] border border-gray-100 bg-white/95 p-2 shadow-[0_12px_36px_rgba(15,23,42,0.12)] backdrop-blur-md">
                    <NavLink
                      to={ROUTES.ACHIEVEMENTS}
                      className="block px-4 py-2 text-xs font-bold text-gray-700 hover:text-[#00D09C] hover:bg-slate-50/60 rounded-xl transition-all duration-200"
                      onClick={() => setIsMoreOpen(false)}
                    >
                      Achievements
                    </NavLink>
                    <NavLink
                      to={ROUTES.ASSOCIATION}
                      className="block px-4 py-2 text-xs font-bold text-gray-700 hover:text-[#00D09C] hover:bg-slate-50/60 rounded-xl transition-all duration-200"
                      onClick={() => setIsMoreOpen(false)}
                    >
                      Our Association
                    </NavLink>
                    <NavLink
                      to={ROUTES.EMI_CALCULATOR}
                      className="block px-4 py-2 text-xs font-bold text-gray-705 hover:text-[#00D09C] hover:bg-slate-50/60 rounded-xl transition-all duration-200"
                      onClick={() => setIsMoreOpen(false)}
                    >
                      EMI Calculator
                    </NavLink>
                    <NavLink
                      to="/#testimonials"
                      className="block px-4 py-2 text-xs font-bold text-gray-705 hover:text-[#00D09C] hover:bg-slate-50/60 rounded-xl transition-all duration-200"
                      onClick={() => setIsMoreOpen(false)}
                    >
                      Testimonials
                    </NavLink>
                    <NavLink
                      to={ROUTES.PARTNERS}
                      className="block px-4 py-2 text-xs font-bold text-gray-705 hover:text-[#00D09C] hover:bg-slate-50/60 rounded-xl transition-all duration-200"
                      onClick={() => setIsMoreOpen(false)}
                    >
                      Lending Partners
                    </NavLink>
                  </div>
                )}
              </div>

              <NavLink to={ROUTES.CONTACT} className={getLinkClass}>
                Contact Us
              </NavLink>
            </div>

            {/* Right Desktop Actions Block */}
            <div className="hidden items-center gap-5 lg:flex">
              {/* Social Media Links */}
              <div className="flex items-center gap-2.5 mr-1">
                <a
                  href="https://www.facebook.com/BundelaFinCorp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 text-gray-500 dark:text-gray-400 hover:text-white hover:bg-[#00D09C] dark:hover:bg-[#06b6d4] transition-all duration-300 hover:scale-105 active:scale-95"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="h-3.5 w-3.5" />
                </a>
                <a
                  href="https://www.instagram.com/bundelafincorp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 text-gray-500 dark:text-gray-400 hover:text-white hover:bg-[#00D09C] dark:hover:bg-[#06b6d4] transition-all duration-300 hover:scale-105 active:scale-95"
                  aria-label="Instagram"
                >
                  <FaInstagram className="h-3.5 w-3.5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/bundelafincorp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 text-gray-500 dark:text-gray-400 hover:text-white hover:bg-[#00D09C] dark:hover:bg-[#06b6d4] transition-all duration-300 hover:scale-105 active:scale-95"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn className="h-3.5 w-3.5" />
                </a>
                <a
                  href="https://wa.me/+919266372051"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 text-gray-500 dark:text-gray-400 hover:text-white hover:bg-[#00D09C] dark:hover:bg-[#06b6d4] transition-all duration-300 hover:scale-105 active:scale-95"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Apply Now Pill Button */}
              <button
                onClick={() => setIsApplyOpen(true)}
                type="button"
                className="duration-250 group flex h-9 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00D09C] to-[#00D09C] px-5 text-sm font-bold text-white shadow-[0_4px_16px_rgba(0, 208, 156,0.18)] transition-all hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_8px_24px_rgba(0, 208, 156,0.28)] focus:outline-none"
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

          {/* Mobile Navigation Panel */}
          {isMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-[39] bg-black/50 lg:hidden"
                onClick={closeMenu}
                aria-hidden="true"
              />
              <div className="animate-mobile-menu-in absolute left-0 right-0 top-full z-50 mt-2 w-full origin-top lg:hidden">
                <div className="mobile-nav-panel flex flex-col gap-4 rounded-[20px] p-5">
                  <div className="flex flex-col gap-1">
                    <NavLink
                      to={ROUTES.HOME}
                      className={({ isActive }) =>
                        `mobile-nav-link ${
                          isActive
                            ? 'bg-secondary/10 text-secondary'
                            : 'mobile-nav-link-default'
                        }`
                      }
                      onClick={closeMenu}
                    >
                      Home
                    </NavLink>
                    <NavLink
                      to={ROUTES.ABOUT}
                      className={({ isActive }) =>
                        `mobile-nav-link ${
                          isActive
                            ? 'bg-secondary/10 text-secondary'
                            : 'mobile-nav-link-default'
                        }`
                      }
                      onClick={closeMenu}
                    >
                      About
                    </NavLink>
                    <NavLink
                      to={ROUTES.SERVICES}
                      className={({ isActive }) =>
                        `mobile-nav-link ${
                          isActive
                            ? 'bg-secondary/10 text-secondary'
                            : 'mobile-nav-link-default'
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
                      className="mobile-nav-link mobile-nav-link-default text-left"
                    >
                      Dealership Form
                    </button>
                    <NavLink
                      to={ROUTES.CONTACT}
                      className={({ isActive }) =>
                        `mobile-nav-link ${
                          isActive
                            ? 'bg-secondary/10 text-secondary'
                            : 'mobile-nav-link-default'
                        }`
                      }
                      onClick={closeMenu}
                    >
                      Contact Us
                    </NavLink>

                    {/* Collapsible More Menu in Mobile */}
                    <div>
                      <button
                        onClick={() => setIsMoreOpen((prev) => !prev)}
                        type="button"
                        className="mobile-nav-link mobile-nav-link-default text-left w-full flex items-center justify-between focus:outline-none cursor-pointer"
                      >
                        <span>More</span>
                        <FiChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMoreOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isMoreOpen && (
                        <div className="pl-4 flex flex-col gap-1 mt-1 bg-slate-50/50 rounded-2xl p-2 border border-slate-105">
                          <NavLink
                            to={ROUTES.ACHIEVEMENTS}
                            className="mobile-nav-link mobile-nav-link-default text-xs font-semibold"
                            onClick={closeMenu}
                          >
                            Achievements
                          </NavLink>
                          <NavLink
                            to={ROUTES.ASSOCIATION}
                            className="mobile-nav-link mobile-nav-link-default text-xs font-semibold"
                            onClick={closeMenu}
                          >
                            Our Association
                          </NavLink>
                          <NavLink
                            to={ROUTES.EMI_CALCULATOR}
                            className="mobile-nav-link mobile-nav-link-default text-xs font-semibold"
                            onClick={closeMenu}
                          >
                            EMI Calculator
                          </NavLink>
                          <NavLink
                            to="/#testimonials"
                            className="mobile-nav-link mobile-nav-link-default text-xs font-semibold"
                            onClick={closeMenu}
                          >
                            Testimonials
                          </NavLink>
                          <NavLink
                            to={ROUTES.PARTNERS}
                            className="mobile-nav-link mobile-nav-link-default text-xs font-semibold"
                            onClick={closeMenu}
                          >
                            Lending Partners
                          </NavLink>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 border-t border-gray-200 pt-4 dark:border-white/10">
                    {/* Social Links for Mobile */}
                    <div className="flex justify-center gap-4 mb-1">
                      <a
                        href="https://www.facebook.com/BundelaFinCorp/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 text-gray-650 dark:text-gray-400 hover:text-white hover:bg-[#00D09C] dark:hover:bg-[#06b6d4] transition-all duration-300"
                        aria-label="Facebook"
                      >
                        <FaFacebookF className="h-4 w-4" />
                      </a>
                      <a
                        href="https://www.instagram.com/bundelafincorp/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 text-gray-650 dark:text-gray-400 hover:text-white hover:bg-[#00D09C] dark:hover:bg-[#06b6d4] transition-all duration-300"
                        aria-label="Instagram"
                      >
                        <FaInstagram className="h-4 w-4" />
                      </a>
                      <a
                        href="https://www.linkedin.com/company/bundelafincorp/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 text-gray-655 dark:text-gray-400 hover:text-white hover:bg-[#00D09C] dark:hover:bg-[#06b6d4] transition-all duration-300"
                        aria-label="LinkedIn"
                      >
                        <FaLinkedinIn className="h-4 w-4" />
                      </a>
                      <a
                        href="https://wa.me/+919266372051"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 text-gray-655 dark:text-gray-400 hover:text-white hover:bg-[#00D09C] dark:hover:bg-[#06b6d4] transition-all duration-300"
                        aria-label="WhatsApp"
                      >
                        <FaWhatsapp className="h-4 w-4" />
                      </a>
                    </div>

                    <button
                      onClick={() => {
                        setIsApplyOpen(true);
                        closeMenu();
                      }}
                      type="button"
                      className="group flex h-9 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00D09C] to-[#00D09C] px-5 text-sm font-bold text-white shadow-[0_4px_16px_rgba(0, 208, 156,0.18)]"
                    >
                      <span>Apply Now</span>
                      <FiArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </nav>
      </div>

      {/* Form overlay modals */}
      <FormModal title="Apply Now" isOpen={isApplyOpen} onClose={() => setIsApplyOpen(false)}>
        <ApplicationForm isModal={true} />
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
