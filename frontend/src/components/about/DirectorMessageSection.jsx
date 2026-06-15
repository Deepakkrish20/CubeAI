import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function DirectorMessageSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-40px' });

  return (
    <section className="relative w-full py-16 lg:py-24 bg-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-[#00D09C]/5 blur-3xl translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-violet-100/30 blur-3xl -translate-x-1/3 translate-y-1/3" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-white border border-gray-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] text-[#00D09C] mb-4">
            Leadership Vision
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[44px] font-black tracking-[-0.03em] text-gray-900 leading-[1.2]">
            Director Message
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          {/* Left Column - Image & Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="w-full lg:w-5/12"
          >
            <div className="relative rounded-[32px] overflow-hidden border border-gray-100 shadow-[0_20px_40px_rgba(15,23,42,0.06)] group">
              <div className="aspect-[4/5] w-full">
                <img
                  src="https://www.bundelafinance.com/img/abhaysir.jpeg"
                  alt="Abhay Singh - Director"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=80';
                  }}
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent p-8 pt-20">
                <h4 className="text-2xl font-black text-white mb-1">Abhay Singh</h4>
                <p className="text-[#00D09C] font-semibold tracking-wide text-sm mb-1 uppercase">Director</p>
                <p className="text-gray-300 font-medium text-xs">Bundela Fin Corp</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Message */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="w-full lg:w-7/12"
          >
            <div className="prose prose-lg prose-gray max-w-none">
              <h4 className="text-2xl font-bold text-gray-900 mb-6">Dear Valued Clients and Partners,</h4>
              
              <div className="space-y-5 text-gray-600 leading-relaxed font-medium">
                <p>
                  Welcome to Bundela Fin Corp, where your financial success and security are our paramount objectives. As the Director of this dynamic institution, I am honored to lead a team that is unwavering in its dedication to delivering exceptional financial services and solutions.
                </p>
                <p>
                  In today's rapidly changing financial landscape, we understand that every client has unique goals and challenges. Our mission is to provide personalized, innovative, and strategic financial solutions that cater to your specific needs. We leverage cutting-edge technology and deep industry expertise to offer you the best possible outcomes.
                </p>
                <p className="p-6 bg-gray-50 border border-gray-100 rounded-2xl italic text-gray-800 font-semibold border-l-4 border-l-[#00D09C]">
                  "Our commitment to integrity, transparency, and excellence is the cornerstone of our operations. We believe in fostering long-term relationships built on trust and mutual respect."
                </p>
                <p>
                  Your financial well-being is our top priority, and we strive to be your trusted partner in achieving your financial aspirations. Thank you for choosing Bundela Fin Corp. We look forward to a prosperous journey with you.
                </p>
                <p>
                  At Bundela Fin Corp, we are more than just a financial services provider; we are a community dedicated to your success. We continuously seek to enhance our services and exceed your expectations. Your feedback is invaluable to us, and we welcome your suggestions as we evolve and grow together.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
