import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateFlatEMI, calculateReducingEMI } from '@/utils/emiCalculator';
import { formatCurrency } from '@/utils/formatters';

function EmiCalculatorSection() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTenure, setLoanTenure] = useState('');
  const [errors, setErrors] = useState({});
  const [results, setResults] = useState(null);

  const validateInputs = () => {
    const newErrors = {};
    const amount = parseFloat(loanAmount);
    const rate = parseFloat(interestRate);
    const tenure = parseInt(loanTenure, 10);

    if (!loanAmount || isNaN(amount) || amount <= 0) {
      newErrors.loanAmount = 'Please enter a valid loan amount greater than 0.';
    }
    if (!interestRate || isNaN(rate) || rate < 0) {
      newErrors.interestRate = 'Please enter a valid interest rate (0% or more).';
    }
    if (!loanTenure || isNaN(tenure) || tenure <= 0) {
      newErrors.loanTenure = 'Please enter a valid tenure greater than 0 months.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      setResults(null);
      return;
    }

    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate);
    const tenure = parseInt(loanTenure, 10);

    const flatResults = calculateFlatEMI(principal, rate, tenure);
    const reducingResults = calculateReducingEMI(principal, rate, tenure);

    setResults({
      flat: flatResults,
      reducing: reducingResults,
    });
  };

  const handleReset = () => {
    setLoanAmount('');
    setInterestRate('');
    setLoanTenure('');
    setErrors({});
    setResults(null);
  };

  return (
    <div className="mx-auto w-full max-w-5xl rounded-[32px] border border-gray-200/50 bg-white/70 backdrop-blur-md p-6 sm:p-8 md:p-10 shadow-[0_16px_48px_rgba(15,23,42,0.03)] relative overflow-hidden">
      {/* Decorative background radial gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-violet-100/10 rounded-full blur-3xl -z-10" />

      <header className="mb-10 text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-white border border-gray-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.01)] text-[#4C1D95] mb-4">
          Financial Tools
        </span>
        <h2 className="font-heading text-3xl font-black tracking-tight text-gray-900 leading-none">
          EMI Calculator
        </h2>
        <p className="mt-2 text-sm text-gray-500 font-medium">
          Compare Flat Rate and Reducing Balance Rate side-by-side
        </p>
      </header>

      <form onSubmit={handleCalculate} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Loan Amount */}
          <div className="flex flex-col">
            <label htmlFor="loanAmount" className="mb-2 text-xs font-bold text-gray-700 uppercase tracking-wider">
              Loan Amount (₹)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">₹</span>
              <input
                type="number"
                id="loanAmount"
                placeholder="e.g. 100,000"
                value={loanAmount}
                onChange={(e) => {
                  setLoanAmount(e.target.value);
                  if (errors.loanAmount) setErrors((prev) => ({ ...prev, loanAmount: '' }));
                }}
                className={`w-full rounded-2xl border bg-white pl-8 pr-4 py-3.5 text-sm font-semibold transition-all focus:outline-none focus:ring-4 ${
                  errors.loanAmount
                    ? 'border-red-500 focus:ring-red-500/10'
                    : 'border-gray-200 focus:border-[#4C1D95] focus:ring-[#4C1D95]/5'
                }`}
              />
            </div>
            {errors.loanAmount && (
              <span className="mt-1 text-xs text-red-500 font-medium">{errors.loanAmount}</span>
            )}
          </div>

          {/* Rate of Interest */}
          <div className="flex flex-col">
            <label htmlFor="interestRate" className="mb-2 text-xs font-bold text-gray-700 uppercase tracking-wider">
              Rate of Interest (% p.a.)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                id="interestRate"
                placeholder="e.g. 12"
                value={interestRate}
                onChange={(e) => {
                  setInterestRate(e.target.value);
                  if (errors.interestRate) setErrors((prev) => ({ ...prev, interestRate: '' }));
                }}
                className={`w-full rounded-2xl border bg-white px-4 py-3.5 text-sm font-semibold transition-all focus:outline-none focus:ring-4 ${
                  errors.interestRate
                    ? 'border-red-500 focus:ring-red-500/10'
                    : 'border-gray-200 focus:border-[#4C1D95] focus:ring-[#4C1D95]/5'
                }`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">%</span>
            </div>
            {errors.interestRate && (
              <span className="mt-1 text-xs text-red-500 font-medium">{errors.interestRate}</span>
            )}
          </div>

          {/* Loan Tenure */}
          <div className="flex flex-col">
            <label htmlFor="loanTenure" className="mb-2 text-xs font-bold text-gray-700 uppercase tracking-wider">
              Loan Tenure (months)
            </label>
            <div className="relative">
              <input
                type="number"
                id="loanTenure"
                placeholder="e.g. 12"
                value={loanTenure}
                onChange={(e) => {
                  setLoanTenure(e.target.value);
                  if (errors.loanTenure) setErrors((prev) => ({ ...prev, loanTenure: '' }));
                }}
                className={`w-full rounded-2xl border bg-white px-4 py-3.5 text-sm font-semibold transition-all focus:outline-none focus:ring-4 ${
                  errors.loanTenure
                    ? 'border-red-500 focus:ring-red-500/10'
                    : 'border-gray-200 focus:border-[#4C1D95] focus:ring-[#4C1D95]/5'
                }`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">mo</span>
            </div>
            {errors.loanTenure && (
              <span className="mt-1 text-xs text-red-500 font-medium">{errors.loanTenure}</span>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:justify-center">
          <button
            type="submit"
            className="flex-1 max-w-[240px] inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#3B0764] to-[#6D28D9] py-4 text-xs font-extrabold uppercase tracking-wider text-white shadow-[0_8px_24px_rgba(76,29,149,0.18)] hover:shadow-[0_12px_30px_rgba(76,29,149,0.28)] hover:scale-[1.01] transition-all duration-300"
          >
            Calculate
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-8 py-4 inline-flex items-center justify-center rounded-2xl border border-gray-200 bg-white text-xs font-bold uppercase tracking-wider text-gray-500 transition-all duration-300 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Results Comparison Block */}
      <AnimatePresence>
        {results && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 border-t border-gray-150 pt-8"
          >
            <h3 className="mb-6 text-center text-lg font-black tracking-tight text-gray-900 uppercase">
              Calculation Comparison
            </h3>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Flat Rate Results (Light Premium Theme) */}
              <div className="rounded-3xl border border-violet-100/80 bg-white p-6 sm:p-8 shadow-[0_8px_32px_rgba(76,29,149,0.03)] flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute -right-8 -top-8 w-24 h-24 bg-violet-50/50 rounded-full blur-xl group-hover:bg-[#4C1D95]/5 transition-all duration-500" />
                
                <div>
                  <h4 className="mb-5 border-b border-gray-100 pb-3 text-sm font-black uppercase text-[#4C1D95] tracking-wider">
                    Flat Interest Rate
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-gray-500 uppercase">Monthly EMI</span>
                      <span className="text-lg font-extrabold text-gray-900">
                        {formatCurrency(results.flat.emi)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-gray-500 uppercase">Total Interest</span>
                      <span className="text-gray-900">
                        {formatCurrency(results.flat.totalInterest)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-6 text-xs font-bold">
                  <span className="text-[#4C1D95] uppercase">Total Payable</span>
                  <span className="text-xl font-black text-[#3B0764]">
                    {formatCurrency(results.flat.totalAmount)}
                  </span>
                </div>
              </div>

              {/* Reducing Rate Results (Dark Premium Theme) */}
              <div className="rounded-3xl border border-[#3B0764]/20 bg-[#120C24] p-6 sm:p-8 shadow-[0_12px_36px_rgba(15,23,42,0.15)] flex flex-col justify-between relative overflow-hidden group">
                {/* Decorative neon ambient glow inside dark card */}
                <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#7C3AED]/10 rounded-full blur-2xl group-hover:bg-[#7C3AED]/15 transition-all duration-500" />
                
                <div>
                  <h4 className="mb-5 border-b border-white/5 pb-3 text-sm font-black uppercase text-violet-300 tracking-wider">
                    Reducing Balance Rate
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-violet-200/60 uppercase">Monthly EMI</span>
                      <span className="text-lg font-extrabold text-white">
                        {formatCurrency(results.reducing.emi)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-violet-200/60 uppercase">Total Interest</span>
                      <span className="text-violet-100">
                        {formatCurrency(results.reducing.totalInterest)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-6 text-xs font-bold">
                  <span className="text-violet-300 uppercase">Total Payable</span>
                  <span className="text-xl font-black text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-violet-200">
                    {formatCurrency(results.reducing.totalAmount)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default EmiCalculatorSection;
