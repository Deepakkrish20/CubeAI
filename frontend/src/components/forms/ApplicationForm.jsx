import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiFileText, FiMapPin, FiUploadCloud, FiCheckCircle } from 'react-icons/fi';
import { servicesData } from '@/data/servicesData';
import Button from '@/components/ui/Button';

// List of Indian States and Union Territories
const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Lakshadweep',
  'Puducherry',
  'Ladakh',
  'Jammu and Kashmir',
];

const STEPS = [
  { id: 'personal', title: 'Personal Info', icon: FiUser },
  { id: 'documents', title: 'Documents', icon: FiFileText },
  { id: 'address', title: 'Address Details', icon: FiMapPin },
];

function ApplicationForm() {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Read pre-selected service from routing state
  const preselectedServiceId = location.state?.preselectedService || '';

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      service: preselectedServiceId,
      gender: 'Male',
      marital: '',
      state: '',
    },
  });

  // Watch uploads to display file names
  const watchedAadhaar = watch('aadhaar');
  const watchedPan = watch('pan');
  const watchedPhoto = watch('photo');

  const aadhaarFile = watchedAadhaar?.[0];
  const panFile = watchedPan?.[0];
  const photoFile = watchedPhoto?.[0];

  // Keep state sync in case navigation state changes
  useEffect(() => {
    if (preselectedServiceId) {
      setValue('service', preselectedServiceId);
    }
  }, [preselectedServiceId, setValue]);

  const handleNextStep = async () => {
    // Validate current step fields before proceeding
    let fieldsToValidate = [];
    if (currentStep === 0) {
      fieldsToValidate = ['service', 'fullName', 'mobile', 'dob'];
    } else if (currentStep === 1) {
      fieldsToValidate = ['aadhaar', 'pan', 'photo'];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(null);

    try {
      // Simulate API response delay
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const payload = {
        ...data,
        aadhaar: aadhaarFile
          ? { name: aadhaarFile.name, size: aadhaarFile.size, type: aadhaarFile.type }
          : null,
        pan: panFile ? { name: panFile.name, size: panFile.size, type: panFile.type } : null,
        photo: photoFile
          ? { name: photoFile.name, size: photoFile.size, type: photoFile.type }
          : null,
      };

      console.log('--- LOAN APPLICATION SUBMITTED (SIMULATED) ---');
      console.log('Payload:', payload);

      setSubmitSuccess(true);
      setCurrentStep(0);
      reset();
    } catch (err) {
      console.error('Submission failed:', err);
      setSubmitError(err.message || 'An error occurred during submission. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl rounded-[32px] border border-gray-200/50 bg-white/70 backdrop-blur-md p-6 sm:p-8 md:p-10 shadow-[0_16px_48px_rgba(15,23,42,0.03)] relative overflow-hidden">
      {/* Decorative top radial gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-violet-100/10 rounded-full blur-3xl -z-10" />

      <header className="mb-10 text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-white border border-gray-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.01)] text-[#4C1D95] mb-4">
          Onboarding
        </span>
        <h2 className="font-heading text-3xl font-black tracking-tight text-gray-900 leading-none">
          Loan Application
        </h2>
        <p className="mt-2 text-sm text-gray-500 font-medium">
          Complete our premium onboarding to request financing.
        </p>
      </header>

      {/* Modern Stepper Header */}
      <div className="mb-10 flex items-center justify-between relative px-2">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2 -z-10" />
        {STEPS.map((step, idx) => {
          const StepIcon = step.icon;
          const isCompleted = currentStep > idx;
          const isActive = currentStep === idx;

          return (
            <div key={step.id} className="flex flex-col items-center gap-2 relative bg-transparent z-10">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 font-bold text-xs ${
                  isCompleted
                    ? 'border-[#4C1D95] bg-[#4C1D95] text-white'
                    : isActive
                    ? 'border-[#4C1D95] bg-white text-[#4C1D95] shadow-[0_0_15px_rgba(76,29,149,0.15)]'
                    : 'border-slate-200 bg-white text-slate-400'
                }`}
              >
                {isCompleted ? <FiCheckCircle className="h-5 w-5" /> : idx + 1}
              </div>
              <span
                className={`text-[10px] font-extrabold uppercase tracking-wider transition-colors duration-300 ${
                  isActive || isCompleted ? 'text-gray-900 font-black' : 'text-slate-400'
                }`}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>

      {submitSuccess && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-2xl border border-violet-100 bg-violet-50/50 p-5 text-xs font-bold text-[#4C1D95] leading-relaxed shadow-sm"
        >
          Your application has been submitted successfully! Our representative will contact you shortly.
        </motion.div>
      )}

      {submitError && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-2xl border border-red-100 bg-red-50 p-5 text-xs font-bold text-red-800 leading-relaxed shadow-sm"
        >
          {submitError}
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AnimatePresence mode="wait">
          {/* Step 1: Personal details */}
          {currentStep === 0 && (
            <motion.div
              key="step-personal"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              {/* Service Selection */}
              <div className="flex flex-col">
                <label htmlFor="service" className="mb-2 text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Select Service *
                </label>
                <select
                  id="service"
                  className={`w-full rounded-2xl border bg-white px-4 py-3.5 text-sm font-semibold transition-all focus:outline-none focus:ring-4 ${
                    errors.service
                      ? 'border-red-500 focus:ring-red-500/10'
                      : 'border-gray-200 focus:border-[#4C1D95] focus:ring-[#4C1D95]/5'
                  }`}
                  {...register('service', { required: 'Please select a service' })}
                >
                  <option value="" disabled>
                    Choose Service
                  </option>
                  {servicesData.map((svc) => (
                    <option key={svc.id} value={svc.id}>
                      {svc.title || svc.categoryTitle}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <span className="mt-1 text-xs text-red-500 font-medium">{errors.service.message}</span>
                )}
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Full Name */}
                <div className="flex flex-col">
                  <label htmlFor="fullName" className="mb-2 text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    placeholder="Enter full name"
                    className={`w-full rounded-2xl border bg-white px-4 py-3.5 text-sm font-semibold transition-all focus:outline-none focus:ring-4 ${
                      errors.fullName
                        ? 'border-red-500 focus:ring-red-500/10'
                        : 'border-gray-200 focus:border-[#4C1D95] focus:ring-[#4C1D95]/5'
                    }`}
                    {...register('fullName', { required: 'Full name is required' })}
                  />
                  {errors.fullName && (
                    <span className="mt-1 text-xs text-red-500 font-medium">{errors.fullName.message}</span>
                  )}
                </div>

                {/* Mobile Number */}
                <div className="flex flex-col">
                  <label htmlFor="mobile" className="mb-2 text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    placeholder="10-digit number"
                    className={`w-full rounded-2xl border bg-white px-4 py-3.5 text-sm font-semibold transition-all focus:outline-none focus:ring-4 ${
                      errors.mobile
                        ? 'border-red-500 focus:ring-red-500/10'
                        : 'border-gray-200 focus:border-[#4C1D95] focus:ring-[#4C1D95]/5'
                    }`}
                    {...register('mobile', {
                      required: 'Mobile number is required',
                      pattern: {
                        value: /^[6-9]\d{9}$/,
                        message: 'Please enter a valid 10-digit Indian mobile number',
                      },
                    })}
                  />
                  {errors.mobile && (
                    <span className="mt-1 text-xs text-red-500 font-medium">{errors.mobile.message}</span>
                  )}
                </div>

                {/* Father's Name */}
                <div className="flex flex-col">
                  <label htmlFor="father" className="mb-2 text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Father&apos;s Name
                  </label>
                  <input
                    type="text"
                    id="father"
                    placeholder="Enter father's name"
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-semibold focus:border-[#4C1D95] focus:outline-none focus:ring-4 focus:ring-[#4C1D95]/5 transition-all"
                    {...register('father')}
                  />
                </div>

                {/* Date of Birth */}
                <div className="flex flex-col">
                  <label htmlFor="dob" className="mb-2 text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    id="dob"
                    className={`w-full rounded-2xl border bg-white px-4 py-3.5 text-sm font-semibold transition-all focus:outline-none focus:ring-4 ${
                      errors.dob
                        ? 'border-red-500 focus:ring-red-500/10'
                        : 'border-gray-200 focus:border-[#4C1D95] focus:ring-[#4C1D95]/5'
                    }`}
                    {...register('dob', { required: 'Date of birth is required' })}
                  />
                  {errors.dob && <span className="mt-1 text-xs text-red-500 font-medium">{errors.dob.message}</span>}
                </div>

                {/* Marital Status */}
                <div className="flex flex-col">
                  <label htmlFor="marital" className="mb-2 text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Marital Status
                  </label>
                  <select
                    id="marital"
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-semibold focus:border-[#4C1D95] focus:outline-none focus:ring-4 focus:ring-[#4C1D95]/5 transition-all"
                    {...register('marital')}
                  >
                    <option value="">Select</option>
                    <option value="Married">Married</option>
                    <option value="Unmarried">Unmarried</option>
                  </select>
                </div>

                {/* Gender */}
                <div className="flex flex-col">
                  <span className="mb-2 text-xs font-bold text-gray-700 uppercase tracking-wider">Gender</span>
                  <div className="flex items-center gap-3 py-2">
                    {['Male', 'Female', 'Other'].map((g) => (
                      <label key={g} className="flex-1 flex items-center justify-center border border-gray-200 bg-white py-2.5 px-3 rounded-xl cursor-pointer hover:bg-slate-50 transition-all font-semibold text-xs select-none">
                        <input
                          type="radio"
                          value={g}
                          className="h-3 w-3 accent-[#4C1D95] mr-2"
                          {...register('gender')}
                        />
                        <span>{g}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Document Uploads */}
          {currentStep === 1 && (
            <motion.div
              key="step-documents"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Upload Aadhaar Card */}
              <div className="flex flex-col">
                <label className="mb-2 text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Upload Aadhaar Card (PDF/JPG/PNG) *
                </label>
                <div className={`relative border-2 border-dashed rounded-[20px] p-6 text-center cursor-pointer transition-all duration-300 ${
                  errors.aadhaar ? 'border-red-300 bg-red-50/20' : 'border-gray-200 hover:border-[#4C1D95] bg-slate-50/30'
                }`}>
                  <input
                    type="file"
                    id="aadhaar"
                    accept=".pdf,.jpg,.jpeg,.png,image/*,application/pdf"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    {...register('aadhaar', {
                      required: 'Aadhaar Card copy is required',
                      validate: {
                        filePresence: (files) => (files && files.length > 0) || 'Please upload Aadhaar Card file',
                      },
                    })}
                  />
                  <div className="flex flex-col items-center justify-center">
                    <FiUploadCloud className="h-8 w-8 text-[#4C1D95] mb-2" />
                    <span className="text-xs font-bold text-gray-700">Choose file or drag & drop</span>
                    <span className="text-[10px] text-gray-400 mt-1">PDF, JPG, PNG up to 10MB</span>
                  </div>
                </div>
                {aadhaarFile && (
                  <div className="mt-2 text-xs text-gray-500 font-bold flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    Selected: {aadhaarFile.name}
                  </div>
                )}
                {errors.aadhaar && (
                  <span className="mt-1 text-xs text-red-500 font-medium">{errors.aadhaar.message}</span>
                )}
              </div>

              {/* Upload PAN Card */}
              <div className="flex flex-col">
                <label className="mb-2 text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Upload PAN Card (PDF/JPG/PNG) *
                </label>
                <div className={`relative border-2 border-dashed rounded-[20px] p-6 text-center cursor-pointer transition-all duration-300 ${
                  errors.pan ? 'border-red-300 bg-red-50/20' : 'border-gray-200 hover:border-[#4C1D95] bg-slate-50/30'
                }`}>
                  <input
                    type="file"
                    id="pan"
                    accept=".pdf,.jpg,.jpeg,.png,image/*,application/pdf"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    {...register('pan', {
                      required: 'PAN Card copy is required',
                      validate: {
                        filePresence: (files) => (files && files.length > 0) || 'Please upload PAN Card file',
                      },
                    })}
                  />
                  <div className="flex flex-col items-center justify-center">
                    <FiUploadCloud className="h-8 w-8 text-[#4C1D95] mb-2" />
                    <span className="text-xs font-bold text-gray-700">Choose file or drag & drop</span>
                    <span className="text-[10px] text-gray-400 mt-1">PDF, JPG, PNG up to 10MB</span>
                  </div>
                </div>
                {panFile && (
                  <div className="mt-2 text-xs text-gray-500 font-bold flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    Selected: {panFile.name}
                  </div>
                )}
                {errors.pan && (
                  <span className="mt-1 text-xs text-red-500 font-medium">{errors.pan.message}</span>
                )}
              </div>

              {/* Upload Photo */}
              <div className="flex flex-col">
                <label className="mb-2 text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Upload Photo (JPG/PNG) *
                </label>
                <div className={`relative border-2 border-dashed rounded-[20px] p-6 text-center cursor-pointer transition-all duration-300 ${
                  errors.photo ? 'border-red-300 bg-red-50/20' : 'border-gray-200 hover:border-[#4C1D95] bg-slate-50/30'
                }`}>
                  <input
                    type="file"
                    id="photo"
                    accept=".jpg,.jpeg,.png,image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    {...register('photo', {
                      required: 'Applicant photo is required',
                      validate: {
                        filePresence: (files) => (files && files.length > 0) || 'Please upload your photo',
                      },
                    })}
                  />
                  <div className="flex flex-col items-center justify-center">
                    <FiUploadCloud className="h-8 w-8 text-[#4C1D95] mb-2" />
                    <span className="text-xs font-bold text-gray-700">Choose file or drag & drop</span>
                    <span className="text-[10px] text-gray-400 mt-1">JPG, PNG up to 10MB</span>
                  </div>
                </div>
                {photoFile && (
                  <div className="mt-2 text-xs text-gray-500 font-bold flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    Selected: {photoFile.name}
                  </div>
                )}
                {errors.photo && (
                  <span className="mt-1 text-xs text-red-500 font-medium">{errors.photo.message}</span>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 3: Address details */}
          {currentStep === 2 && (
            <motion.div
              key="step-address"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* State */}
                <div className="flex flex-col">
                  <label htmlFor="state" className="mb-2 text-xs font-bold text-gray-700 uppercase tracking-wider">
                    State *
                  </label>
                  <select
                    id="state"
                    className={`w-full rounded-2xl border bg-white px-4 py-3.5 text-sm font-semibold transition-all focus:outline-none focus:ring-4 ${
                      errors.state
                        ? 'border-red-500 focus:ring-red-500/10'
                        : 'border-gray-200 focus:border-[#4C1D95] focus:ring-[#4C1D95]/5'
                    }`}
                    {...register('state', { required: 'Please select your state' })}
                  >
                    <option value="">Select State</option>
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                  {errors.state && (
                    <span className="mt-1 text-xs text-red-500 font-medium">{errors.state.message}</span>
                  )}
                </div>

                {/* City */}
                <div className="flex flex-col">
                  <label htmlFor="city" className="mb-2 text-xs font-bold text-gray-700 uppercase tracking-wider">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    placeholder="Enter city"
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-semibold focus:border-[#4C1D95] focus:outline-none focus:ring-4 focus:ring-[#4C1D95]/5 transition-all"
                    {...register('city')}
                  />
                </div>

                {/* Postal Code */}
                <div className="flex flex-col sm:col-span-2">
                  <label htmlFor="postal" className="mb-2 text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postal"
                    placeholder="6-digit postal code"
                    className={`w-full rounded-2xl border bg-white px-4 py-3.5 text-sm font-semibold transition-all focus:outline-none focus:ring-4 ${
                      errors.postal
                        ? 'border-red-500 focus:ring-red-500/10'
                        : 'border-gray-200 focus:border-[#4C1D95] focus:ring-[#4C1D95]/5'
                    }`}
                    {...register('postal', {
                      pattern: {
                        value: /^\d{6}$/,
                        message: 'Please enter a valid 6-digit postal code',
                      },
                    })}
                  />
                  {errors.postal && (
                    <span className="mt-1 text-xs text-red-500 font-medium">{errors.postal.message}</span>
                  )}
                </div>

                {/* Full Address */}
                <div className="flex flex-col sm:col-span-2">
                  <label htmlFor="address" className="mb-2 text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Full Address
                  </label>
                  <textarea
                    id="address"
                    rows="3"
                    placeholder="Enter complete residential address"
                    className="w-full resize-none rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-semibold focus:border-[#4C1D95] focus:outline-none focus:ring-4 focus:ring-[#4C1D95]/5 transition-all"
                    {...register('address')}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stepper Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-150 mt-8">
          <button
            type="button"
            onClick={handlePrevStep}
            disabled={currentStep === 0 || isSubmitting}
            className="px-6 py-3 rounded-2xl border border-gray-200 bg-white text-xs font-bold uppercase tracking-wider text-gray-500 transition-all duration-300 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Back
          </button>
          
          {currentStep < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="px-6 py-3 rounded-2xl bg-[#4C1D95] text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#3B0764]"
            >
              Next
            </button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting}
              className="py-3 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#3B0764] to-[#6D28D9] shadow-[0_8px_24px_rgba(76,29,149,0.18)] hover:shadow-[0_12px_30px_rgba(76,29,149,0.28)]"
            >
              {isSubmitting ? 'Submitting Application...' : 'Apply Now'}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ApplicationForm;
