import { useState } from 'react';
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
    <div className="mx-auto w-full max-w-4xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
      <header className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">EMI Calculator</h2>
        <p className="mt-1 text-sm text-gray-500">
          Compare Flat Rate and Reducing Balance Rate side-by-side
        </p>
      </header>

      <form onSubmit={handleCalculate} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* Loan Amount */}
          <div className="flex flex-col">
            <label htmlFor="loanAmount" className="mb-1.5 text-sm font-semibold text-gray-700">
              Loan Amount (₹)
            </label>
            <input
              type="number"
              id="loanAmount"
              placeholder="e.g. 100000"
              value={loanAmount}
              onChange={(e) => {
                setLoanAmount(e.target.value);
                if (errors.loanAmount) setErrors((prev) => ({ ...prev, loanAmount: '' }));
              }}
              className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                errors.loanAmount
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-primary focus:ring-primary/20'
              }`}
            />
            {errors.loanAmount && (
              <span className="mt-1 text-xs text-red-500">{errors.loanAmount}</span>
            )}
          </div>

          {/* Rate of Interest */}
          <div className="flex flex-col">
            <label htmlFor="interestRate" className="mb-1.5 text-sm font-semibold text-gray-700">
              Rate of Interest (per annum %)
            </label>
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
              className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                errors.interestRate
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-primary focus:ring-primary/20'
              }`}
            />
            {errors.interestRate && (
              <span className="mt-1 text-xs text-red-500">{errors.interestRate}</span>
            )}
          </div>

          {/* Loan Tenure */}
          <div className="flex flex-col">
            <label htmlFor="loanTenure" className="mb-1.5 text-sm font-semibold text-gray-700">
              Loan Tenure (months)
            </label>
            <input
              type="number"
              id="loanTenure"
              placeholder="e.g. 12"
              value={loanTenure}
              onChange={(e) => {
                setLoanTenure(e.target.value);
                if (errors.loanTenure) setErrors((prev) => ({ ...prev, loanTenure: '' }));
              }}
              className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                errors.loanTenure
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-primary focus:ring-primary/20'
              }`}
            />
            {errors.loanTenure && (
              <span className="mt-1 text-xs text-red-500">{errors.loanTenure}</span>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <button
            type="submit"
            className="hover:bg-primary-dark flex-1 rounded-lg bg-primary py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200"
          >
            Calculate
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-700 transition duration-200 hover:bg-gray-50"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Results Comparison Block */}
      {results && (
        <div className="mt-8 border-t border-gray-200 pt-6">
          <h3 className="mb-4 text-center text-lg font-bold text-gray-900">
            Calculation Comparison
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Flat Rate Results */}
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-5">
              <h4 className="mb-4 border-b border-gray-200 pb-2 text-base font-bold text-gray-800">
                Flat Interest Rate
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Monthly EMI</span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(results.flat.emi)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Total Interest</span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(results.flat.totalInterest)}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-2 text-sm font-semibold text-gray-800">
                  <span>Total Amount Payable</span>
                  <span className="text-base text-gray-950">
                    {formatCurrency(results.flat.totalAmount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Reducing Rate Results */}
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-5">
              <h4 className="mb-4 border-b border-gray-200 pb-2 text-base font-bold text-gray-800">
                Reducing Balance Rate
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Monthly EMI</span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(results.reducing.emi)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Total Interest</span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(results.reducing.totalInterest)}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-2 text-sm font-semibold text-gray-800">
                  <span>Total Amount Payable</span>
                  <span className="text-base text-gray-950">
                    {formatCurrency(results.reducing.totalAmount)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmiCalculatorSection;
