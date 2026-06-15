import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import NewsletterForm from '@/components/forms/NewsletterForm';
import { footerData } from '@/data/footerData';
import { FiMapPin, FiPhone, FiMail, FiX } from 'react-icons/fi';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import Logo from '@/components/common/Logo';

const UNAVAILABLE_MESSAGE = 'Footer information is currently unavailable.';

// Premium Modal component for Policies
function PolicyModal({ title, isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Glass background overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md"
          />
          
          {/* Modal content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex max-h-[85vh] w-full max-w-2xl flex-col rounded-[28px] border border-white/10 bg-[#120C24] text-slate-100 shadow-[0_24px_60px_rgba(0,0,0,0.5)] overflow-hidden z-10"
          >
            <header className="flex items-center justify-between border-b border-white/5 px-6 py-5">
              <h3 className="font-heading text-base font-black uppercase tracking-wider text-white">{title}</h3>
              <button
                onClick={onClose}
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none transition-all duration-200"
              >
                <FiX className="h-4 w-4" />
              </button>
            </header>
            
            <div className="space-y-4 overflow-y-auto p-6 sm:p-8 text-xs font-semibold text-slate-300 leading-relaxed scrollbar-thin">
              {children}
            </div>
            
            <footer className="flex justify-end border-t border-white/5 px-6 py-4">
              <button
                onClick={onClose}
                type="button"
                className="rounded-xl bg-gradient-to-r from-[#006B50] to-[#00B386] px-6 py-2.5 text-xs font-black uppercase tracking-wider text-white hover:shadow-[0_4px_16px_rgba(0, 208, 156,0.2)] transition-all duration-300"
              >
                Close
              </button>
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function Footer({ data = footerData }) {
  const [modalType, setModalType] = useState(null); // 'terms' | 'refund' | 'privacy' | null

  if (!data || typeof data !== 'object') {
    return (
      <footer
        id="footer"
        className="w-full border-t border-gray-800 bg-[#09070F] py-12 text-gray-400"
      >
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="text-sm text-gray-500">{UNAVAILABLE_MESSAGE}</p>
        </div>
      </footer>
    );
  }

  const {
    quickLinks = [],
    serviceLinks = [],
    contactDetails = {},
    socialLinks = [],
    newsletter = {},
    copyright = {},
  } = data;

  const handleLinkClick = (e, link) => {
    if (link.action) {
      e.preventDefault();
      setModalType(link.action);
    }
  };

  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'facebook':
        return <FaFacebookF className="h-4 w-4" />;
      case 'instagram':
        return <FaInstagram className="h-4 w-4" />;
      case 'linkedin':
        return <FaLinkedinIn className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <footer
      id="footer"
      className="relative w-full border-t border-white/5 bg-[#09070F] pb-8 pt-16 text-slate-400 overflow-hidden"
    >
      {/* Background glow highlights */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-gradient-to-tr from-[#006B50]/20 to-[#00D09C]/5 blur-3xl -z-10 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid gap-8 border-b border-white/5 pb-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Office Info */}
          <section className="flex flex-col gap-5">
            <Logo variant="onDark" showText textColor="text-white" />

            <h4 className="text-[10px] font-black uppercase tracking-widest text-white mt-2">Our Office</h4>
            {contactDetails.officeName && (
              <p className="text-sm font-black text-white">{contactDetails.officeName}</p>
            )}
            {contactDetails.address && (
              <div className="flex items-start gap-2.5 text-xs font-semibold leading-relaxed text-slate-400">
                <FiMapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[#00D09C]" />
                <span>{contactDetails.address}</span>
              </div>
            )}
            {contactDetails.phone && (
              <div className="flex items-center gap-2.5 text-xs font-bold text-slate-400">
                <FiPhone className="h-4 w-4 shrink-0 text-[#00D09C]" />
                <a
                  href={`tel:${contactDetails.phone}`}
                  className="transition-colors hover:text-white"
                >
                  {contactDetails.phone}
                </a>
              </div>
            )}
            {contactDetails.email && (
              <div className="flex items-center gap-2.5 text-xs font-bold text-slate-400">
                <FiMail className="h-4 w-4 shrink-0 text-[#00D09C]" />
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="transition-colors hover:text-white"
                >
                  {contactDetails.email}
                </a>
              </div>
            )}

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="mt-3 flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/5 text-gray-400 transition-all duration-300 hover:border-white hover:bg-white hover:text-[#006B50] hover:scale-105 active:scale-95"
                  >
                    {getSocialIcon(social.platform)}
                  </a>
                ))}
              </div>
            )}
          </section>

          {/* Services Links */}
          <section className="flex flex-col gap-5">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Services</h4>
            {serviceLinks.length > 0 ? (
              <ul className="space-y-3 text-xs font-bold text-slate-400">
                {serviceLinks.map((link) => (
                  <li key={link.id}>
                    <Link
                      to={link.path}
                      className="inline-block transition-all duration-200 hover:text-white hover:translate-x-1"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-gray-500">No service links available.</p>
            )}
          </section>

          {/* Quick Links */}
          <section className="flex flex-col gap-5">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Quick Links</h4>
            {quickLinks.length > 0 ? (
              <ul className="space-y-3 text-xs font-bold text-slate-400">
                {quickLinks.map((link) => (
                  <li key={link.id}>
                    {link.action ? (
                      <button
                        onClick={(e) => handleLinkClick(e, link)}
                        type="button"
                        className="text-left inline-block transition-all duration-200 hover:text-white hover:translate-x-1"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        to={link.path}
                        className="inline-block transition-all duration-200 hover:text-white hover:translate-x-1"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-gray-500">No quick links available.</p>
            )}
          </section>

          {/* Newsletter section */}
          <section className="flex flex-col gap-5">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-white">
              {newsletter.title || 'Newsletter'}
            </h4>
            {newsletter.description && (
              <p className="text-xs leading-relaxed text-slate-400 font-semibold">{newsletter.description}</p>
            )}
            <NewsletterForm />
          </section>
        </div>

        {/* Copyright Panel */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-center text-[10px] font-bold uppercase tracking-wider text-slate-500 md:flex-row md:text-left">
          <p>
            &copy; {new Date().getFullYear()}{' '}
            {copyright.text || 'Bundela Fin Corp. All Right Reserved.'}
          </p>
          {copyright.designerName && (
            <p className="text-[9px]">
              Designed By{' '}
              <a
                href={copyright.designerUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 underline hover:text-white"
              >
                {copyright.designerName}
              </a>
              {' '}• Distributed By{' '}
              <a
                href={copyright.designerUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 underline hover:text-white"
              >
                {copyright.designerName}
              </a>
            </p>
          )}
        </div>
      </div>

      {/* POLICY MODALS */}
      <PolicyModal
        title="Terms and Conditions"
        isOpen={modalType === 'terms'}
        onClose={() => setModalType(null)}
      >
        <h6 className="mb-2 text-xs font-black uppercase text-white tracking-wide">Acceptance of Terms</h6>
        <p className="mb-4">
          Before you access this Website, www.bundelafinance.com, or avail the services/purchase the
          products offered on the Website, we request you to please go through these Terms of Use
          (“Terms”) and the Privacy Policy. These Terms and the Privacy Policy together constitute a
          binding legal agreement (“Agreement”) between user and BUNDELA FIN CORP.
        </p>
        <p className="mb-4 font-black uppercase text-violet-300 tracking-wide">
          BY CONTINUING TO ACCESS AND USE THIS WEBSITE YOU CONFIRM THAT YOU ACCEPT OUR TERMS &
          CONDITIONS SET OUT BELOW. IF YOU DO NOT ACCEPT THE TERMS, YOU MUST LEAVE THIS WEBSITE
          IMMEDIATELY.
        </p>
        <h6 className="mb-2 text-xs font-black uppercase text-white tracking-wide">About Us</h6>
        <p className="mb-4">
          www.bundelafinance.com is a website owned, maintained, and provided by BUNDELA FINANCIAL
          CONSULTANCY PVT. LTD. (hereinafter “BUNDELA FIN CORP”) & (“BUNDELA FIN CORP” is registered
          trademark of Bundela Financial Consultancy Pvt. Ltd).
        </p>
        <div className="pt-2 mt-4 border-t border-white/5 space-y-1">
          <p><strong>Phone:</strong> +91-1205095106</p>
          <p>
            <strong>Address:</strong> Bundela Fin Corp, C-420, 4th Floor, Block C Golden I, TechZone
            IV, Greater Noida West, 201308, Uttar Pradesh, India
          </p>
          <p><strong>Email:</strong> info@bundelafinance.com</p>
        </div>
      </PolicyModal>

      <PolicyModal
        title="Refund Policy"
        isOpen={modalType === 'refund'}
        onClose={() => setModalType(null)}
      >
        <h6 className="mb-2 text-xs font-black uppercase text-white tracking-wide">
          1. Refund Request for Double Deduction
        </h6>
        <p className="mb-4">
          Borrowers may request a refund in the event of a double deduction of EMI for a due date.
          To initiate a refund request, borrowers must contact our customer support team at
          redressal@bundelafinance.com or support@bundelafinance.com within 2 days of the debits
          from their account.
        </p>
        <p className="mb-4">
          If the refund request is deemed valid, resolution will be provided within 3 working days.
          The refunded amount is expected to reflect in the customer’s account within 10 days from
          the date of the refund.
        </p>
        <h6 className="mb-2 text-xs font-black uppercase text-white tracking-wide">
          2. Payment Failure and Automatic Refund
        </h6>
        <p className="mb-4">
          In the case of payment failure (where payment is not received by BUNDELA FIN CORP), but
          the amount is deducted from the customer’s bank account, the payment gateway will
          automatically refund the amount in accordance with their policy.
        </p>
        <p className="pt-2 mt-4 border-t border-white/5">
          <strong>Note:</strong> All refund requests are subject to validation by BUNDELA FIN CORP,
          and decisions will be made based on the merit of each individual case.
        </p>
      </PolicyModal>

      <PolicyModal
        title="Privacy Policy"
        isOpen={modalType === 'privacy'}
        onClose={() => setModalType(null)}
      >
        <p className="mb-4">
          BUNDELA FIN CORP (“BUNDELA FIN CORP”), a partnership firm with its registered office
          located at OC-527, 5TH Floor, Gaur City Centre, Greater Noida West, 201306 Uttar Pradesh.
          This policy outlines the objective of requesting for your personal information and briefly
          explains as to how we keep it secure.
        </p>
        <h6 className="mb-2 text-xs font-black uppercase text-white tracking-wide">Consent</h6>
        <p className="mb-4 font-black uppercase text-violet-300 tracking-wide">
          BY ACCEPTING THE PRIVACY POLICY, YOU EXPRESSLY CONSENT TO COMPANY’S COLLECTION, RETENTION,
          ANALYSIS, DESTRUCTION, USE AND DISCLOSURE OF YOUR PERSONAL INFORMATION IN ACCORDANCE WITH
          THIS PRIVACY POLICY.
        </p>
        <h6 className="mb-2 text-xs font-black uppercase text-white tracking-wide">
          Personal Information We Collect
        </h6>
        <p className="mb-4">
          We collect personal and financial information like your name, address, date of birth, PAN
          number, bank statements, pay slips, etc. We will also collect credit-related information
          from sources like CIBIL and other credit bureaus.
        </p>
        <p className="pt-2 mt-4 border-t border-white/5">
          <strong>Contact Info:</strong> info@bundelafinance.com
        </p>
      </PolicyModal>
    </footer>
  );
}

export default Footer;
