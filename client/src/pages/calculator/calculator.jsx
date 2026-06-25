import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

function Calculator() {
  const [activeCalc, setActiveCalc] = useState('Investment Calculator');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Unified state for inputs
  const [amount, setAmount] = useState(50000);
  const [annualContribution, setAnnualContribution] = useState(10000); // For Investment Calculator
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(5);
  const [compoundFreq, setCompoundFreq] = useState(12); // For Investment Calculator
  const [mfInvestmentType, setMfInvestmentType] = useState('Lumpsum Investment'); // For MF Returns Calculator

  const [chartData, setChartData] = useState([]);
  const [summary, setSummary] = useState({ totalInvested: 0, estimatedReturns: 0, totalValue: 0 });

  const defaultValues = {
    'EMI Calculator': { amount: 500000, rate: 9, years: 15 },
    'MF Returns Calculator': { amount: 100000, rate: 12, years: 10, type: 'Lumpsum Investment' },
    'FD Calculator': { amount: 100000, rate: 7, years: 5 },
    'RD Calculator': { amount: 10000, rate: 6.5, years: 2 },
    'SIP Calculator': { amount: 5000, rate: 15, years: 10 },
    'Lumpsum Calculator': { amount: 50000, rate: 12, years: 5 },
    'Investment Calculator': { amount: 50000, annualContribution: 10000, rate: 12, years: 5, compoundFreq: 12 },
  };

  const handleCalcChange = (calc) => {
    setActiveCalc(calc);
    const defaults = defaultValues[calc];
    setAmount(defaults.amount);
    setRate(defaults.rate);
    setYears(defaults.years);
    if (defaults.annualContribution !== undefined) setAnnualContribution(defaults.annualContribution);
    if (defaults.compoundFreq !== undefined) setCompoundFreq(defaults.compoundFreq);
    if (defaults.type) setMfInvestmentType(defaults.type);
  };

  const handleCalculate = (e) => {
    if (e) e.preventDefault();
    calculateReturns();
  };

  const calculateReturns = () => {
    let data = [];
    const r = (parseFloat(rate) || 0) / 100;
    const y = parseInt(years) || 0;
    const p = parseFloat(amount) || 0;

    if (activeCalc === 'Investment Calculator') {
      let currentTotal = p;
      let totalInvested = p;
      const freq = parseInt(compoundFreq) || 12;
      const contribution = parseFloat(annualContribution) || 0;

      data.push({ year: 0, invested: totalInvested, returns: 0, total: currentTotal });

      for (let i = 1; i <= y; i++) {
        currentTotal = currentTotal * Math.pow(1 + r / freq, freq);
        totalInvested += contribution;
        currentTotal += contribution;

        data.push({
          year: i,
          invested: Math.round(totalInvested),
          returns: Math.round(currentTotal - totalInvested),
          total: Math.round(currentTotal)
        });
      }
      setChartData(data);
      setSummary({
        totalInvested: Math.round(totalInvested),
        estimatedReturns: Math.round(currentTotal - totalInvested),
        totalValue: Math.round(currentTotal)
      });
      return;
    }

    let calcMode;
    if (activeCalc === 'SIP Calculator') {
      calcMode = 'SIP';
    } else if (activeCalc === 'RD Calculator') {
      calcMode = 'RD';
    } else if (activeCalc === 'EMI Calculator') {
      calcMode = 'EMI';
    } else if (activeCalc === 'MF Returns Calculator') {
      calcMode = mfInvestmentType === 'SIP' ? 'SIP' : 'LUMPSUM';
    } else if (activeCalc === 'FD Calculator') {
      calcMode = 'FD';
    } else {
      calcMode = 'LUMPSUM';
    }

    if (calcMode === 'LUMPSUM' || calcMode === 'FD') {
      let currentTotal = p;
      let totalInvested = p;
      const freq = calcMode === 'FD' ? 4 : 1;

      data.push({ year: 0, invested: totalInvested, returns: 0, total: currentTotal });

      for (let i = 1; i <= y; i++) {
        currentTotal = currentTotal * Math.pow(1 + r / freq, freq);
        data.push({
          year: i,
          invested: Math.round(totalInvested),
          returns: Math.round(currentTotal - totalInvested),
          total: Math.round(currentTotal)
        });
      }
      setChartData(data);
      setSummary({
        totalInvested: Math.round(totalInvested),
        estimatedReturns: Math.round(currentTotal - totalInvested),
        totalValue: Math.round(currentTotal)
      });
    }
    else if (calcMode === 'RD') {
      let currentTotal = 0;
      let totalInvested = 0;
      const monthlyRate = r / 12;

      data.push({ year: 0, invested: 0, returns: 0, total: 0 });

      for (let i = 1; i <= y; i++) {
        const currentMonths = i * 12;
        totalInvested = p * currentMonths;
        currentTotal = p * ( (Math.pow(1 + monthlyRate, currentMonths) - 1) / (1 - Math.pow(1 + monthlyRate, -1)) );

        data.push({
          year: i,
          invested: Math.round(totalInvested),
          returns: Math.round(currentTotal - totalInvested),
          total: Math.round(currentTotal)
        });
      }
      setChartData(data);
      setSummary({
        totalInvested: Math.round(totalInvested),
        estimatedReturns: Math.round(currentTotal - totalInvested),
        totalValue: Math.round(currentTotal)
      });
    }
    else if (calcMode === 'SIP') {
      let currentTotal = 0;
      let totalInvested = 0;
      // Groww uses effective monthly rate derived from annual compound rate
      const monthlyRate = Math.pow(1 + r, 1 / 12) - 1;

      data.push({ year: 0, invested: 0, returns: 0, total: 0 });

      for (let i = 1; i <= y; i++) {
        const currentMonths = i * 12;
        totalInvested = p * currentMonths;
        // Groww uses Beginning-Of-Month compounding with this effective rate
        currentTotal = p * (Math.pow(1 + monthlyRate, currentMonths) - 1) / monthlyRate * (1 + monthlyRate);

        data.push({
          year: i,
          invested: Math.round(totalInvested),
          returns: Math.round(currentTotal - totalInvested),
          total: Math.round(currentTotal)
        });
      }
      setChartData(data);
      setSummary({
        totalInvested: Math.round(totalInvested),
        estimatedReturns: Math.round(currentTotal - totalInvested),
        totalValue: Math.round(currentTotal)
      });
    }
    else if (calcMode === 'EMI') {
      const monthlyRate = r / 12;
      const months = y * 12;
      let emi;
      if (monthlyRate > 0) {
        emi = (p * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
      } else {
        emi = p / months;
      }

      const totalPayment = emi * months;
      const totalInterest = totalPayment - p;

      let balance = p;
      data.push({ year: 0, invested: Math.round(balance), returns: 0, total: Math.round(balance) });

      for (let i = 1; i <= y; i++) {
        const passedMonths = i * 12;
        let remainingBalance;
        if (monthlyRate > 0) {
          remainingBalance = p * Math.pow(1 + monthlyRate, passedMonths) - (emi / monthlyRate) * (Math.pow(1 + monthlyRate, passedMonths) - 1);
        } else {
          remainingBalance = p - (emi * passedMonths);
        }

        data.push({
          year: i,
          invested: Math.max(0, Math.round(remainingBalance)),
          returns: 0,
          total: Math.max(0, Math.round(remainingBalance))
        });
      }
      setChartData(data);
      setSummary({
        totalInvested: Math.round(p),
        estimatedReturns: Math.round(totalInterest),
        totalValue: Math.round(totalPayment),
        monthlyEmi: Math.round(emi)
      });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    calculateReturns();
  }, [activeCalc, amount, annualContribution, rate, years, compoundFreq, mfInvestmentType]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const calculatorsList = [
    'Investment Calculator',
    'SIP Calculator',
    'Lumpsum Calculator',
    'EMI Calculator',
    'MF Returns Calculator',
    'FD Calculator',
    'RD Calculator',
  ];

  const getFormConfig = () => {
    switch (activeCalc) {
      case 'Investment Calculator':
        return {
          amountLabel: 'Invested amount:',
          amountPrefix: '₹',
          rateLabel: 'Interest rate:',
          rateSuffix: '% Return on investment (Interest)',
          timeLabel: 'Number of years:',
          timeSuffix: 'Years to invest',
          buttonText: 'Submit'
        };
      case 'SIP Calculator':
        return {
          amountLabel: 'Monthly SIP Amount:',
          amountPrefix: '₹',
          rateLabel: 'Expected Annual Return:',
          rateSuffix: '% per annum',
          timeLabel: 'Investment Period:',
          timeSuffix: 'Years',
          buttonText: 'Calculate SIP'
        };
      case 'Lumpsum Calculator':
        return {
          amountLabel: 'Investment Amount:',
          amountPrefix: '₹',
          rateLabel: 'Expected Annual Return:',
          rateSuffix: '% per annum',
          timeLabel: 'Investment Period:',
          timeSuffix: 'Years',
          buttonText: 'Calculate Returns'
        };
      case 'EMI Calculator':
        return {
          amountLabel: 'Loan Amount:',
          amountPrefix: '₹',
          rateLabel: 'Interest Rate:',
          rateSuffix: '% per annum',
          timeLabel: 'Loan Tenure:',
          timeSuffix: 'Years',
          buttonText: 'Calculate EMI'
        };
      case 'Mutual Fund Returns Calculator':
      case 'MF Returns Calculator': // Fallback
        return {
          amountLabel: mfInvestmentType === 'SIP' ? 'Monthly SIP Amount:' : 'Total Investment:',
          amountPrefix: '₹',
          rateLabel: 'Expected Annual Return:',
          rateSuffix: '% per annum',
          timeLabel: 'Investment Period:',
          timeSuffix: 'Years',
          buttonText: 'Calculate MF Returns'
        };
      case 'FD Calculator':
        return {
          amountLabel: 'Principal Amount:',
          amountPrefix: '₹',
          rateLabel: 'Interest Rate:',
          rateSuffix: '% per annum',
          timeLabel: 'Investment Period:',
          timeSuffix: 'Years',
          buttonText: 'Calculate FD Returns'
        };
      case 'RD Calculator':
        return {
          amountLabel: 'Monthly Deposit:',
          amountPrefix: '₹',
          rateLabel: 'Interest Rate:',
          rateSuffix: '% per annum',
          timeLabel: 'Investment Period:',
          timeSuffix: 'Years',
          buttonText: 'Calculate RD Returns'
        };
      default:
        return {
          amountLabel: 'Amount:',
          amountPrefix: '₹',
          rateLabel: 'Rate:',
          timeLabel: 'Years:',
          buttonText: 'Calculate'
        };
    }
  };

  const config = getFormConfig();
  const isEmi = activeCalc === 'EMI Calculator';

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Top Banner */}
      <section className="relative bg-gradient-to-br from-green-950 via-green-900 to-green-950 text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold-400 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gold-400 blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto relative z-10 text-center flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-400/10 border border-gold-400/25 text-gold-400 text-xs md:text-sm font-bold tracking-widest uppercase mb-8 shadow-sm animate-pulse">
            Interactive Financial Tools
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-sans tracking-tight">
            Financial <span className="text-gold-400 relative after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-full after:h-1 after:bg-gold-400/40">Calculators</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Estimate compounding returns, loan EMIs, and effectively plan your financial future.
          </p>
        </motion.div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 pb-16">
        <div className="flex flex-col gap-8">

          {/* Main Calculator Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full flex flex-col gap-8"
          >
            {/* Form Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-green-700/5 p-6 md:p-10">
              <div className="mb-8 border-b border-gray-100 pb-6 inline-block relative w-full sm:w-auto z-30">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="text-xl md:text-2xl font-bold text-green-950 bg-green-50/50 hover:bg-green-50 px-5 py-3 rounded-xl pr-12 w-full focus:outline-none focus:ring-2 focus:ring-gold-400/50 border border-green-100 shadow-sm transition-colors text-left relative"
                >
                  <span className="truncate block pr-4">{activeCalc === 'MF Returns Calculator' ? 'Mutual Fund Returns Calculator' : activeCalc}</span>
                  <Icons.ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 text-green-700 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} size={24} />
                </button>

                {isDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsDropdownOpen(false)}
                    />
                    <div className="absolute top-full left-0 mt-2 w-full sm:w-[350px] bg-white rounded-xl shadow-xl border border-green-700/10 z-50 overflow-hidden animate-fade-in">
                      <div className="flex flex-col max-h-[350px] overflow-y-auto py-2">
                        {calculatorsList.map((calc, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              handleCalcChange(calc);
                              setIsDropdownOpen(false);
                            }}
                            className={`text-left px-5 py-3.5 text-base font-semibold transition-all duration-200 hover:bg-green-50 hover:text-green-900 ${activeCalc === calc ? 'bg-green-50/50 text-green-950 border-l-4 border-gold-400 pl-4' : 'text-gray-500 border-l-4 border-transparent pl-5'}`}
                          >
                            {calc === 'MF Returns Calculator' ? 'Mutual Fund Returns Calculator' : calc}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <form onSubmit={handleCalculate} className="flex flex-col gap-6 w-full">

                {activeCalc === 'MF Returns Calculator' && (
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                    <label className="text-sm font-bold text-green-950 md:w-1/3">Investment Type:</label>
                    <div className="md:w-2/3 relative">
                      <select
                        value={mfInvestmentType}
                        onChange={(e) => setMfInvestmentType(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-colors bg-white appearance-none text-gray-700"
                      >
                        <option value="Lumpsum Investment">Lumpsum Investment</option>
                        <option value="SIP">SIP</option>
                      </select>
                      <Icons.ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    </div>
                  </div>
                )}

                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                  <label className="text-sm font-bold text-green-950 md:w-1/3">{config.amountLabel}</label>
                  <div className="md:w-2/3 relative flex items-center gap-3">
                    <div className="relative flex-grow flex items-center">
                      {config.amountPrefix && <span className="absolute left-4 text-gray-500 font-medium z-10">{config.amountPrefix}</span>}
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className={`w-full py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-colors text-gray-800 ${config.amountPrefix ? 'pl-10 pr-4' : 'px-4'}`}
                      />
                    </div>
                  </div>
                </div>

                {activeCalc === 'Investment Calculator' && (
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                    <label className="text-sm font-bold text-green-950 md:w-1/3">Annual Contribution:</label>
                    <div className="md:w-2/3 relative flex items-center gap-3">
                      <div className="relative flex-grow flex items-center">
                        <span className="absolute left-4 text-gray-500 font-medium z-10">₹</span>
                        <input
                          type="number"
                          value={annualContribution}
                          onChange={(e) => setAnnualContribution(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-colors text-gray-800"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                  <label className="text-sm font-bold text-green-950 md:w-1/3">{config.rateLabel}</label>
                  <div className="md:w-2/3 relative flex items-center gap-3">
                    <div className="relative flex-grow">
                      <input
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-colors text-gray-800"
                      />
                    </div>
                    {config.rateSuffix && <span className="text-gray-500 font-medium text-xs sm:text-sm md:min-w-[140px] leading-tight">{config.rateSuffix}</span>}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                  <label className="text-sm font-bold text-green-950 md:w-1/3">{config.timeLabel}</label>
                  <div className="md:w-2/3 relative flex items-center gap-3">
                    <div className="relative flex-grow">
                      <input
                        type="number"
                        value={years}
                        onChange={(e) => setYears(e.target.value)}
                        className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-colors text-gray-800"
                      />
                    </div>
                    {config.timeSuffix && <span className="text-gray-500 font-medium text-xs sm:text-sm md:min-w-[140px] leading-tight">{config.timeSuffix}</span>}
                  </div>
                </div>

                {activeCalc === 'Investment Calculator' && (
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                    <label className="text-sm font-bold text-green-950 md:w-1/3">Compounding percentage:</label>
                    <div className="md:w-2/3 relative flex items-center gap-3">
                      <div className="relative flex-grow">
                        <select
                          value={compoundFreq}
                          onChange={(e) => setCompoundFreq(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-colors bg-white appearance-none text-gray-700"
                        >
                          <option value={1}>Annually</option>
                          <option value={2}>Semi-Annually</option>
                          <option value={4}>Quarterly</option>
                          <option value={12}>Monthly</option>
                        </select>
                        <Icons.ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                      </div>
                      <span className="text-gray-500 font-medium text-xs sm:text-sm md:min-w-[140px] leading-tight">% reinvested profits</span>
                    </div>
                  </div>
                )}

                <div className="pt-6">
                  <button type="submit" className="btn-primary w-full py-4 px-6 shadow-lg shadow-gold-400/15 font-bold text-center flex items-center justify-center rounded-lg transition-all duration-300">
                    {config.buttonText}
                  </button>
                </div>
              </form>
            </div>

            {/* Results & Chart Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-green-700/5 p-6 md:p-8">
              <div className={`grid grid-cols-1 ${isEmi ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'} gap-4 mb-8`}>
                <div className="bg-green-50 p-4 rounded-xl border border-green-100 text-center">
                  <p className="text-sm text-green-800 font-medium mb-1">
                    {isEmi ? 'Principal Amount' : 'Total Invested'}
                  </p>
                  <p className="text-xl font-bold text-green-950">{formatCurrency(summary.totalInvested)}</p>
                </div>
                <div className="bg-gold-50 p-4 rounded-xl border border-gold-100 text-center">
                  <p className="text-sm text-gold-800 font-medium mb-1">
                    {isEmi ? 'Total Interest' : 'Est. Returns'}
                  </p>
                  <p className="text-xl font-bold text-green-950">{formatCurrency(summary.estimatedReturns)}</p>
                </div>
                <div className="bg-green-950 p-4 rounded-xl border border-green-900 text-center">
                  <p className="text-sm text-green-100 font-medium mb-1">
                    {isEmi ? 'Total Payment' : 'Total Value'}
                  </p>
                  <p className="text-xl font-bold text-gold-400">{formatCurrency(summary.totalValue)}</p>
                </div>
                {isEmi && (
                  <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 text-center">
                    <p className="text-sm text-emerald-800 font-medium mb-1">Monthly EMI</p>
                    <p className="text-xl font-bold text-emerald-950">{formatCurrency(summary.monthlyEmi || 0)}</p>
                  </div>
                )}
              </div>

              <h3 className="text-xl font-bold text-green-950 mb-6">
                {isEmi ? 'Loan Amortization (Remaining Balance)' : 'Investment Breakdown'}
              </h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis
                      stroke="#94a3b8"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `₹${value >= 100000 ? (value / 100000).toFixed(1) + 'L' : value}`}
                    />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <Tooltip
                      formatter={(value) => formatCurrency(value)}
                      labelFormatter={(label) => `Year ${label}`}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    {!isEmi && <Line type="monotone" dataKey="total" stroke="#fbbf24" strokeWidth={3} dot={false} activeDot={{ r: 6 }} name="Total Value" />}
                    <Line type="monotone" dataKey="invested" stroke="#15803d" strokeWidth={3} dot={false} activeDot={{ r: 6 }} name={isEmi ? "Remaining Balance" : "Invested Amount"} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

export default Calculator;
