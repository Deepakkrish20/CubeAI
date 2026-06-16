import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import NewsletterForm from '@/components/forms/NewsletterForm';
import { footerData } from '@/data/footerData';
import { FiMapPin, FiPhone, FiMail, FiX } from 'react-icons/fi';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaWhatsapp } from 'react-icons/fa';

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
      case 'whatsapp':
        return <FaWhatsapp className="h-4 w-4" />;
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
            <h3 className="text-xl font-bold text-white">Our Office</h3>
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
            <h3 className="text-xl font-bold text-white">Services</h3>
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
            <h3 className="text-xl font-bold text-white">Quick Links</h3>
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
            <h3 className="text-xl font-bold text-white">
              {newsletter.title || 'Newsletter'}
            </h3>
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
        </div>
      </div>

      {/* POLICY MODALS */}
      <PolicyModal
        title="Terms and Conditions"
        isOpen={modalType === 'terms'}
        onClose={() => setModalType(null)}
      >
        <p className="mb-4">
          Before you access this Website, www.bundelafinance.com, or avail the services/purchase the
          produces offered on the Website, we request you to please go through these Terms of Use
          (“Terms”) and the Privacy Policy. These Terms and the Privacy Policy together constitute a
          binding legal agreement (“Agreement”) between user and BUNDELA FIN CORP.
        </p>
        <p className="mb-4 font-black uppercase text-violet-300 tracking-wide">
          BY CONTINUING TO ACCESS AND USE THIS WEBSITE YOU CONFIRM THAT YOU ACCEPT OUR TERMS &
          CONDITIONS SET OUT BELOW. IF YOU DO NOT ACCEPT THE TERMS, YOU MUST LEAVE THIS WEBSITE
          IMMEDIATELY.
        </p>
        <p className="mb-4">
          Your access to/use of the Website and Services provided therein will be solely at our discretion.
        </p>
        <ol className="list-decimal pl-5 space-y-4">
          <li>
            <strong className="text-white block mb-1">ABOUT US</strong>
            <p className="mb-2">
              www.bundelafinance.com is a website owned, maintained, and provided by BUNDELA FINANCIAL
              CONSULTANCY PVT. LTD. (hereinafter “BUNDELA FIN CORP”) & (“BUNDELA FIN CORP” is registered
              trademark of Bundela Financial Consultancy Pvt. Ltd). If you need any information or have a
              complaint/grievance pertaining to this website or any of our services, please contact us using
              any of the following methods:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-1">
              <li><strong>Phone:</strong> +91-1205095106</li>
              <li><strong>Address:</strong> OC-527, 5th Floor, Gaur City Centre, Greater Noida West, GBN, UP. 201309.</li>
              <li><strong>Email:</strong> info@bundelafinance.com</li>
            </ul>
          </li>
          <li>
            <strong className="text-white block mb-1">PRIVACY</strong>
            <p>
              Your privacy and that of each person whose information you provide to us is important to us.
              Please see our privacy policy for details of what information we collect and how we will use
              and protect it.
            </p>
          </li>
          <li>
            <strong className="text-white block mb-1">REGISTRATION</strong>
            <p className="mb-2">
              By registering for and/or using these services you agree that you are sound minded, at least
              eighteen years of age and you are not debarred by any law to contract and you agree to have
              read and accepted the following terms and conditions:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Visitors to this website are encouraged to register in order to use its facilities/
                services. We are not under any obligation to accept a request for registration and reserve
                the right to suspend or terminate access at any time if your continued use is believed to
                prejudice us or other users. By registering to use this website, you confirm that the
                information you provide during the registration process is accurate and complete. You agree
                to update your registration details promptly if they change. All registration information
                you provide will be kept secure and processed in accordance with our privacy policy.
              </li>
              <li>
                BUNDELA FIN CORP and other third parties with whom we have a business relationship may
                occasionally promote their goods or services on the website or through other direct marketing
                initiatives or may make software and other material available to you for purchase or download.
                We do not endorse the products or services they offer, or give you any assurance that they
                will be suitable to your needs. It is your responsibility to satisfy yourself in this regard and
                we have no liability in connection with the same. All promotions are for a limited period and
                subject to special terms and conditions, which are in addition to and not in derogation of the
                terms and condition stated herein.
              </li>
            </ul>
          </li>
          <li>
            <strong className="text-white block mb-1">LINKS FROM THIS WEBSITE</strong>
            <p>
              We may, from time to time, provide links from this website to other websites that are owned
              and controlled by third parties. These links are provided only for your convenience and we have
              no control over and will have no liability in respect of those websites.
            </p>
          </li>
          <li>
            <strong className="text-white block mb-1">SURVEYS, CONTESTS & REFERRALS</strong>
            <p>
              From time-to-time our site requests information from users via surveys or contests.
              Participation in these surveys, contests or referrals programs is completely voluntary and,
              therefore, you have a choice whether to disclose any information requested. Information
              requested may include contact information (such as name and delivery address), and demographic
              information (such as postcode, age level). Contact information will be used to notify the
              winners and award prizes. Survey information will be used for purposes of monitoring or
              improving the functionality of the site. The terms and conditions for each survey and contest
              may differ or may otherwise be amended and cancelled at the sole discretion of BUNDELA FIN CORP.
            </p>
          </li>
          <li>
            <strong className="text-white block mb-1">MONITORING</strong>
            <p>
              We may monitor activity and content on this website and may take any action we consider
              appropriate if we suspect that you may be in breach of these Terms, including suspending,
              attaching conditions to or terminating your access and/or notifying the authorities or
              relevant regulators of your activities.
            </p>
          </li>
          <li>
            <strong className="text-white block mb-1">ACCURACY OF INFORMATION</strong>
            <p>
              We take care to ensure that all information available on our website about our business,
              services and any products mentioned is accurate. However, these are continuously developing and,
              occasionally, the information may be out of date.
            </p>
          </li>
          <li>
            <strong className="text-white block mb-1">DISCLAIMER</strong>
            <p>
              BUNDELA FIN CORP does not warrant or represent that the material on this website is accurate,
              complete or current or that the website will be free of defects or viruses.
            </p>
          </li>
          <li>
            <strong className="text-white block mb-1">LIABILITY</strong>
            <p>
              We will not be liable for any loss or damage (in contract, negligence or otherwise) where,
              there is no breach of a legal duty of care owed to you by us.
            </p>
          </li>
          <li>
            <strong className="text-white block mb-1">THIRD PARTY RIGHTS</strong>
            <p>
              Nothing in these Terms is intended to nor shall it confer a benefit on any third party and a
              person who is not a party to these terms or any contract formed thereunder has no rights to
              enforce them. We reserve the right to change these terms at any time. The new version will be
              posted on this website and will take effect immediately upon posting.
            </p>
          </li>
          <li>
            <strong className="text-white block mb-1">INFORMATION TECHNOLOGY ACT</strong>
            <p>
              Certain laws in India prohibit and impose restriction on use of the Website and you are
              advised to make familiar with those laws and not to post any information or messages that are,
              or that may be construed, as being malicious, defamatory, inappropriate, slanderous,
              pornographic or otherwise sexually oriented or that makes attacks on or otherwise opines or
              comments on any individuals or groups of individuals, educational institutions or any other
              entities whatsoever (whether companies, firms, or any other institutions). You also agree not
              to post any information to which you do not have copyright or other appropriate permissions to
              post in public forum. Your failure to comply with these terms may result in removal of your
              posts without prior notice. The IP address of all posts is recorded to aid in enforcing these
              conditions.
            </p>
          </li>
          <li>
            <strong className="text-white block mb-1">OTHER APPLICATION LAWS</strong>
            <p>
              Certain laws require us to maintain data with respect to goods and services provided and other
              personal information in a prescribed format and BUNDELA FIN CORP will use all information to
              the extent required for compliance with applicable laws and as may be directed from time to
              time.
            </p>
          </li>
          <li>
            <strong className="text-white block mb-1">FORCE MAJEURE</strong>
            <p>
              BUNDELA FIN CORP shall not be liable to the extent the performance or delay in performance of
              any of its obligations are prevented, restricted, delayed or interfered with due to
              circumstances beyond the reasonable control and without the fault or negligence of such Party,
              including but not limited to change in legislation, fire, flood, explosion, epidemic,
              accident, act of God, war, riot, strike, lockout, traffic or other concerted act of workmen
              and/or act of Government. BUNDELA FIN CORP may at its sole discretion withdraw the services or
              Goods if a Force Majeure event occurs.
            </p>
          </li>
          <li>
            <strong className="text-white block mb-1">LIABILITY FOR OUR SERVICES</strong>
            <p>
              To the extent permitted by law, BUNDELA FIN CORP and its associates/employees will not be
              responsible for lost profits, revenues, or data, financial losses or indirect, special,
              consequential, exemplary, or punitive damages.
            </p>
          </li>
          <li>
            <strong className="text-white block mb-1">GOVERNING LAW AND JURISDICTION</strong>
            <p>
              The Terms of Use Agreement is governed by and construed in accordance with the laws of India,
              without reference to conflict of laws principles and you irrevocably and unconditionally
              submit to the exclusive jurisdiction of the courts located in Gautam Buddh Nagar, Uttar
              Pradesh, India.
            </p>
          </li>
        </ol>
      </PolicyModal>

      <PolicyModal
        title="Refund Policy"
        isOpen={modalType === 'refund'}
        onClose={() => setModalType(null)}
      >
        <ol className="list-decimal pl-5 space-y-4">
          <li>
            <strong className="text-white block mb-1">REFUND REQUEST FOR DOUBLE DEDUCTION:</strong>
            <ul className="list-disc pl-5 space-y-1.5 mt-1">
              <li>Borrowers may request a refund in the event of a double deduction of EMI for a due date.</li>
              <li>To initiate a refund request, borrowers must contact our customer support team at <strong>redressal@bundelafinance.com</strong> or <strong>support@bundelafinance.com</strong> within 2 days of the debits from their account.</li>
              <li>If the refund request is deemed valid, resolution will be provided within 3 working days.</li>
              <li>If eligible for a refund, the processing will occur within 7 days of resolution.</li>
              <li>The refunded amount is expected to reflect in the customer’s account within 10 days from the date of the refund.</li>
            </ul>
          </li>
          <li>
            <strong className="text-white block mb-1">PAYMENT FAILURE AND AUTOMATIC REFUND:</strong>
            <ul className="list-disc pl-5 space-y-1.5 mt-1">
              <li>In the case of payment failure (where payment is not received by BUNDELA FIN CORP), but the amount is deducted from the customer’s bank account, the payment gateway will automatically refund the amount in accordance with their policy.</li>
              <li>Customers facing this issue can contact the payment gateway’s customer support team for a prompt resolution.</li>
            </ul>
          </li>
        </ol>
        <p className="mt-4 pt-3 border-t border-white/5">
          <strong>Note:</strong> All refund requests are subject to validation by BUNDELA FIN CORP, and
          decisions will be made based on the merit of each individual case. Customers are encouraged to
          reach out to our customer support team for any concerns or inquiries regarding refund processes.
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
          explains as to how we keep it secure. Please note that during the course of your business
          relationship with BUNDELA FIN CORP you will be always informed regarding such permissions. We
          request you to carefully read our Privacy Policy and feel free to get back to our Grievance
          Redressal Officer in the event you require any clarification in respect of our Privacy Policy.
          We also request you to review our Privacy Policy from time to time because your use of our
          products and services implies your acceptance of our prevailing Privacy Policy.
        </p>
        <p className="mb-4 font-black uppercase text-violet-300 tracking-wide">
          BY ACCEPTING THE PRIVACY POLICY, YOU EXPRESSLY CONSENT TO COMPANY’S COLLECTION, RETENTION,
          ANALYSIS, DESTRUCTION, USE AND DISCLOSURE OF YOUR PERSONAL INFORMATION IN ACCORDANCE WITH
          THIS PRIVACY POLICY.
        </p>
        <ol className="list-decimal pl-5 space-y-4">
          <li>
            <strong className="text-white block mb-1">WHICH PERSONAL INFORMATION WE COLLECT</strong>
            <p className="mb-2">We collect and process the following information for a number of objectives:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                To create an account on BUNDELA FIN CORP, you are required to: (a) provide us with your
                basic personal information as part of our customer identification process, and (b) agree with
                BUNDELA FIN CORP’s User Terms and Conditions and this Privacy Policy, which governs how we
                treat your information. We will request you, subject to you agreeing to use the Application, to
                provide certain personal and financial information like your name, address, date of birth, PAN
                number, bank statements, pay slips, etc. We will also collect credit related information that is
                collected from other sources like CIBIL the credit bureau and other similar organization(s). In
                addition, we will also collect your social data (from Facebook and LinkedIn) as well as information
                from your contacts, camera, location etc.
              </li>
              <li>
                The Application and BUNDELA FIN CORP’s or its affiliates’ website is intended for users of the
                age of 18 and above only. Accordingly, we will not knowingly collect or use any personal
                information from individuals that we believe to be under the age of 18 years. In addition, we
                will delete any information in our database that we know originates from an individual under the
                age of 18.
              </li>
            </ul>
          </li>
          <li>
            <strong className="text-white block mb-1">CONSENT</strong>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                BUNDELA FIN CORP and the third-party tools including Software Development Kit, it uses shall
                obtain your consent before collecting personal information for providing its services to you.
                Personal information for purposes of this Policy means information that identifies you, such as
                your name, apps, device information, camera, location, calendar, and such other information as
                specified in this policy. All or any personal information so provided will be as and on basis
                and BUNDELA FIN CORP shall not be responsible for the authenticity and/ or accuracy of the
                personal information supplied by you. You will be solely responsible for the authenticity and/
                or accuracy of the personal information provided by you for the purposes connected with the terms
                of use which has been agreed by you to avail the services through our application. You have the
                option not to provide or agree to collection of your personal information. If you choose not to
                agree with this policy, you will not be entitled to use the services subject to the terms of its
                use. You can also anytime withdraw the consent you provided by emailing at
                <strong>info@bundelafincorp.in</strong> and making a request for termination of the services
                agreed to be availed by you as per the terms of use.
              </li>
              <li>
                The information we collect about you will depend on the products and services we offer. If you do
                not allow us to collect all the information we request, we may not be able to deliver all of
                these services effectively. BUNDELA FIN CORP will limit the collection and use of your information
                only on a need-to-know basis to deliver better service.
              </li>
              <li>
                You additionally authorise BUNDELA FIN CORP to exchange, share, part with all your information
                related to the details and transaction history to its affiliates/ banks/ financial institutions/
                credit bureaus/ agencies/ participation in any telecommunication or electronic clearing network as
                may be required by law, customary practice, credit reporting, statistical analysis and credit
                scoring, verification or risk management and shall not hold BUNDELA FIN CORP liable for use or
                disclosure of such information.
              </li>
            </ul>
          </li>
          <li>
            <strong className="text-white block mb-1">WHAT DO WE DO WITH THE INFORMATION COLLECTED?</strong>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                We will use this information to establish identity and assess applications, design our products,
                manage your relationship with us, offer our products and services, manage our risks including the
                risk of fraud, get in touch with you, data analysis in order to improve our business for
                providing improved consumer experience to you, comply with country laws and inform you about
                other products or services we think you might find useful. BUNDELA FIN CORP needs this information
                to operate and provide various services to you. Application uses and discloses your personal
                information only as follows: (a) to fulfill your requests for products and services offered and
                subscribed and accepted by you, (b) to deliver to you any administrative notices, alerts, advice
                and communications relevant to your use of our services, (c) share your information with its
                group companies and other relevant third parties so far as required or to provide similar services
                to you with various value added services, collecting subscription fees for the services provided
                to you, notifying or contacting you regarding any problem with/ or the expiration of the
                Application and/ or its website, (d) project planning, troubleshooting problems, detecting and
                protecting against error, fraud or other criminal activity, (e) to third- party contractors that
                provide their services to BUNDELA FIN CORP and are bound by this policy. We may also collect and use
                this information in other ways as may be permitted under applicable law.
              </li>
              <li>
                Data Collected from the Website will be retained for a period of 8 Years. When data retention
                requirements have been met, records must be either immediately destroyed or placed in secure
                locations (Server and Cloud Database) as described in controlled destruction later as per policy.
              </li>
              <li>
                The proper destruction of records is essential to creating a credible records management program.
                Records containing restricted/sensitive data shall only be destroyed in the ordinary course of
                business; no records that are currently involved in, or have open investigations, audits, or
                litigation pending shall be destroyed or otherwise discarded.
              </li>
              <li>
                We protect your information using physical, technical, and administrative security measures to
                reduce the risks of loss, misuse, unauthorized access, disclosure and alteration. To achieve the
                same, we use reasonable security practices and procedures as mandated under applicable laws for the
                protection of your information. Some of the safeguards we use are firewalls and data encryption using
                SSL, and information access authorization controls to protect your information. Accordingly, we assume
                no liability for any disclosure of data due to errors in transmission, unauthorized third-party access
                or other acts of third parties, or acts or omissions beyond our reasonable control.
              </li>
              <li>
                However, you understand and accept that there is no guarantee that data transmission over the
                Internet will be completely secure and that any information that you transmit to us is at your
                own risk.
              </li>
            </ul>
          </li>
          <li>
            <strong className="text-white block mb-1">PHISHING</strong>
            <p>
              “Phishing” usually occurs when users of a website are induced by an individual/ entity into
              divulging sensitive personal data by using fraudulent websites and/ or e-mail addresses. In the event
              you provide information to a website or respond to an e-mail which does not belong to BUNDELA FIN CORP
              or is not connected with us in any manner, you will be a victim of Phishing. We do not send e-mails
              requesting a user for payment information, username or passwords. However, we may verify the user’s
              name, password etc. provided by you from time to time.
            </p>
          </li>
          <li>
            <strong className="text-white block mb-1">REVIEW AND MAKING CHANGES TO PERSONAL INFORMATION</strong>
            <p>
              You can request and we shall correct errors in your personal information by emailing us at
              <strong>info@bundelafincorp.in</strong>. If you want to obtain a copy of your personal information, for
              your protection, you will be required to provide proof of your identity to obtain a copy of your
              personal information. If your any change occurs in your personal information changes or if you no longer
              want to avail our services, you may correct, update or deactivate your personal information by sending
              an email to us at <strong>info@bundelafinance.com</strong>. or in the alternative, you can correct,
              update of deactivate your account through the account management screen available on our website
              and/ or the Application. However, any such correction or updation in your personal information will be
              subject to our verification. Further, if you would like to deactivate and/ or terminate your account
              maintained with BUNDELA FIN CORP, you can send in your said request to us at
              <strong>info@bundelafincorp.in</strong>.
            </p>
          </li>
          <li>
            <strong className="text-white block mb-1">GENERAL</strong>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                The accuracy and confidentiality of the information provided by you is your responsibility. You are
                also responsible for maintaining the secrecy of your passwords, email address and other account details
                at all times. We recommend a strong password that you do not use with other services. To make the
                password complex and difficult for others to guess, you should use a combination of alphabets, numbers
                and special characters (like: !, @, #, $ etc.).
              </li>
              <li>
                Under any circumstances, you should not disclose your password to anyone or keep any written or other
                record of the said password which might result in any third-party gaining access to your password.
              </li>
            </ul>
          </li>
          <li>
            <strong className="text-white block mb-1">DISCLOSURE</strong>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                The information you provide may be disclosed by us to our agents, employees, subsidiaries and
                affiliates, or to other third-party service providers of BUNDELA FIN CORP who require the information
                for the purposes of operating and maintaining BUNDELA FIN CORP’s platform for the provision of
                services.
              </li>
              <li>
                We will comply with requests and directions of all governmental, law enforcement, or regulatory
                authorities, which it believes in good faith to be in accordance with any applicable law. Such
                compliance may include providing user information whether it is personally identifiable information or
                not, to such agency or authority. BUNDELA FIN CORP may transfer sensitive personal data or information
                to another Indian body corporate that ensures the same level of data protection that is adhered to by
                BUNDELA FIN CORP, if it is necessary for the performance of a lawful contract between BUNDELA FIN CORP
                or any person on its behalf and you or where you have consented to the data transfer. Moreover, you
                shall not disclose to any other person, in any manner whatsoever, any information relating to BUNDELA
                FIN CORP and/ or its affiliates of a confidential nature obtained in the course of availing the
                services through our website and/ or the Application. Failure to comply with this obligation shall be
                a serious breach of the terms herein and shall entitle BUNDELA FIN CORP and/ or its affiliates to
                terminate the services immediately.
              </li>
              <li>
                Personal information of the users will not be sold or otherwise transferred to unaffiliated third
                parties unless otherwise stated at the time of collection or without your approval, as the case may
                be. However, BUNDELA FIN CORP might share, exchange and disclose information to its affiliates and/
                or group companies, agents or to any third-party service provider to deliver you products and
                services in the manner agreed by you.
              </li>
              <li>
                If you have any questions or concerns about this policy, please feel free to contact us at
                <strong>info@bundelafincorp.in</strong> and we will be happy to assist you.
              </li>
            </ul>
          </li>
          <li>
            <strong className="text-white block mb-1">CUSTOMER GRIEVANCE REDRESSAL</strong>
            <ul className="list-disc pl-5 space-y-1 mt-1">
              <li><strong>Email:</strong> info@bundelafincorp.in</li>
              <li>
                Our dedicated customer service team is here to assist you with any concerns or queries you may
                have. You can reach them via email at <strong>info@bundelafincorp.in</strong> or by calling
                <strong>+919266372051</strong>. If the initial resolution doesn’t meet your expectations, our
                Grievance Redressal Officer is available to address escalated matters. The details are below:
              </li>
              <li>
                <strong>Address:</strong> Bundela Fin Corp, OC-527, 5th Floor, Gaur City Centre, Greater Noida
                West, 201306, Uttar Pradesh India.
              </li>
            </ul>
          </li>
        </ol>
      </PolicyModal>
    </footer>
  );
}

export default Footer;
