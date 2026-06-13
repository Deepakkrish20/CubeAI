/**
 * Calculate EMI details using the Flat Interest Rate formula.
 * @param {number} principal - Loan amount (P)
 * @param {number} annualRate - Annual interest rate (percentage R)
 * @param {number} tenureMonths - Loan tenure in months (T)
 * @returns {object} { emi, totalInterest, totalAmount }
 */
export const calculateFlatEMI = (principal, annualRate, tenureMonths) => {
  const p = Number(principal) || 0;
  const r = Number(annualRate) || 0;
  const t = Number(tenureMonths) || 0;

  if (p <= 0 || t <= 0) {
    return { emi: 0, totalInterest: 0, totalAmount: 0 };
  }

  // Flat rate calculation: Interest is calculated on the entire principal for the entire tenure.
  const totalInterest = (p * r * (t / 12)) / 100;
  const totalAmount = p + totalInterest;
  const emi = totalAmount / t;

  return {
    emi: Math.round(emi * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
  };
};

/**
 * Calculate EMI details using the Reducing Interest Rate formula.
 * @param {number} principal - Loan amount (P)
 * @param {number} annualRate - Annual interest rate (percentage R)
 * @param {number} tenureMonths - Loan tenure in months (T)
 * @returns {object} { emi, totalInterest, totalAmount }
 */
export const calculateReducingEMI = (principal, annualRate, tenureMonths) => {
  const p = Number(principal) || 0;
  const r = Number(annualRate) || 0;
  const t = Number(tenureMonths) || 0;

  if (p <= 0 || t <= 0) {
    return { emi: 0, totalInterest: 0, totalAmount: 0 };
  }

  const monthlyRate = r / 12 / 100;

  let emi = 0;
  if (monthlyRate === 0) {
    emi = p / t;
  } else {
    emi = (p * monthlyRate * Math.pow(1 + monthlyRate, t)) / (Math.pow(1 + monthlyRate, t) - 1);
  }

  const totalAmount = emi * t;
  const totalInterest = totalAmount - p;

  return {
    emi: Math.round(emi * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
  };
};

/**
 * Legacy wrapper for backward compatibility with existing code.
 * Calculates reducing EMI.
 */
export const calculateEMI = (principal, annualRate, tenureMonths) => {
  const result = calculateReducingEMI(principal, annualRate, tenureMonths);
  return Math.round(result.emi);
};

/**
 * Legacy wrapper for backward compatibility with existing code.
 * Calculates total interest for reducing EMI.
 */
export const calculateTotalInterest = (emi, tenureMonths, principal) => {
  return Math.round(emi * tenureMonths - principal);
};
