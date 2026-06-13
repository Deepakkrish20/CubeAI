import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { servicesData } from '@/data/servicesData';
import Button from '@/components/ui/Button';

// List of Indian States and Union Territories from reference site
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

function ApplicationForm() {
  const location = useLocation();
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
    formState: { errors },
  } = useForm({
    defaultValues: {
      service: preselectedServiceId,
      gender: 'Male',
      marital: '',
      state: '',
    },
  });

  // Keep state sync in case navigation state changes
  useEffect(() => {
    if (preselectedServiceId) {
      setValue('service', preselectedServiceId);
    }
  }, [preselectedServiceId, setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(null);

    try {
      // Simulate API response delay
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Construct payload summary for logging (extracting file names)
      const aadhaarFile = data.aadhaar?.[0];
      const panFile = data.pan?.[0];
      const photoFile = data.photo?.[0];

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

      /*
       * FUTURE API INTEGRATION:
       * To connect this form to a backend REST API, replace the simulated submission with:
       *
       * const formData = new FormData();
       * formData.append('service', data.service);
       * formData.append('fullName', data.fullName);
       * formData.append('mobile', data.mobile);
       * formData.append('father', data.father || '');
       * formData.append('dob', data.dob);
       * formData.append('marital', data.marital || '');
       * formData.append('gender', data.gender);
       * formData.append('state', data.state);
       * formData.append('city', data.city || '');
       * formData.append('postal', data.postal || '');
       * formData.append('address', data.address || '');
       *
       * if (data.aadhaar?.[0]) formData.append('aadhaar', data.aadhaar[0]);
       * if (data.pan?.[0]) formData.append('pan', data.pan[0]);
       * if (data.photo?.[0]) formData.append('photo', data.photo[0]);
       *
       * try {
       *   const response = await api.post('/applications', formData, {
       *     headers: { 'Content-Type': 'multipart/form-data' }
       *   });
       *   // Handle success...
       * } catch (err) {
       *   // Handle error...
       * }
       */

      setSubmitSuccess(true);
      reset();
    } catch (err) {
      console.error('Submission failed:', err);
      setSubmitError(err.message || 'An error occurred during submission. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
      <header className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Loan Application</h2>
        <p className="mt-1 text-sm text-gray-500">
          Please fill in the details below to submit your application.
        </p>
      </header>

      {submitSuccess && (
        <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
          Your application has been submitted successfully! Our representative will contact you
          shortly.
        </div>
      )}

      {submitError && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Service Selection */}
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="service" className="mb-1.5 text-sm font-semibold text-gray-700">
              Select Service *
            </label>
            <select
              id="service"
              className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                errors.service
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-primary focus:ring-primary/20'
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
              <span className="mt-1 text-xs text-red-500">{errors.service.message}</span>
            )}
          </div>

          {/* Full Name */}
          <div className="flex flex-col">
            <label htmlFor="fullName" className="mb-1.5 text-sm font-semibold text-gray-700">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter full name"
              className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                errors.fullName
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-primary focus:ring-primary/20'
              }`}
              {...register('fullName', { required: 'Full name is required' })}
            />
            {errors.fullName && (
              <span className="mt-1 text-xs text-red-500">{errors.fullName.message}</span>
            )}
          </div>

          {/* Mobile Number */}
          <div className="flex flex-col">
            <label htmlFor="mobile" className="mb-1.5 text-sm font-semibold text-gray-700">
              Mobile Number *
            </label>
            <input
              type="tel"
              id="mobile"
              placeholder="10-digit number"
              className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                errors.mobile
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-primary focus:ring-primary/20'
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
              <span className="mt-1 text-xs text-red-500">{errors.mobile.message}</span>
            )}
          </div>

          {/* Father's Name */}
          <div className="flex flex-col">
            <label htmlFor="father" className="mb-1.5 text-sm font-semibold text-gray-700">
              Father&apos;s Name
            </label>
            <input
              type="text"
              id="father"
              placeholder="Enter father's name"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              {...register('father')}
            />
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col">
            <label htmlFor="dob" className="mb-1.5 text-sm font-semibold text-gray-700">
              Date of Birth *
            </label>
            <input
              type="date"
              id="dob"
              className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                errors.dob
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-primary focus:ring-primary/20'
              }`}
              {...register('dob', { required: 'Date of birth is required' })}
            />
            {errors.dob && <span className="mt-1 text-xs text-red-500">{errors.dob.message}</span>}
          </div>

          {/* Marital Status */}
          <div className="flex flex-col">
            <label htmlFor="marital" className="mb-1.5 text-sm font-semibold text-gray-700">
              Marital Status
            </label>
            <select
              id="marital"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              {...register('marital')}
            >
              <option value="">Select</option>
              <option value="Married">Married</option>
              <option value="Unmarried">Unmarried</option>
            </select>
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <span className="mb-1.5 text-sm font-semibold text-gray-700">Gender</span>
            <div className="flex items-center gap-4 py-1.5">
              <label className="inline-flex items-center text-sm text-gray-700">
                <input
                  type="radio"
                  value="Male"
                  className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                  {...register('gender')}
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="inline-flex items-center text-sm text-gray-700">
                <input
                  type="radio"
                  value="Female"
                  className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                  {...register('gender')}
                />
                <span className="ml-2">Female</span>
              </label>
              <label className="inline-flex items-center text-sm text-gray-700">
                <input
                  type="radio"
                  value="Other"
                  className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                  {...register('gender')}
                />
                <span className="ml-2">Other</span>
              </label>
            </div>
          </div>

          {/* File Uploads Section Heading */}
          <div className="border-gray-150 mt-2 border-t pt-4 md:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-800">
              Required Document Uploads
            </h3>
          </div>

          {/* Upload Aadhaar Card */}
          <div className="flex flex-col">
            <label htmlFor="aadhaar" className="mb-1 text-sm font-semibold text-gray-700">
              Upload Aadhaar Card (PDF/JPG/PNG) *
            </label>
            <input
              type="file"
              id="aadhaar"
              accept=".pdf,.jpg,.jpeg,.png,image/*,application/pdf"
              className={`w-full rounded-lg border bg-gray-50 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 ${
                errors.aadhaar
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-primary focus:ring-primary/20'
              }`}
              {...register('aadhaar', {
                required: 'Aadhaar Card copy is required',
                validate: {
                  filePresence: (files) =>
                    (files && files.length > 0) || 'Please upload Aadhaar Card file',
                },
              })}
            />
            {errors.aadhaar && (
              <span className="mt-1 text-xs text-red-500">{errors.aadhaar.message}</span>
            )}
          </div>

          {/* Upload PAN Card */}
          <div className="flex flex-col">
            <label htmlFor="pan" className="mb-1 text-sm font-semibold text-gray-700">
              Upload PAN Card (PDF/JPG/PNG) *
            </label>
            <input
              type="file"
              id="pan"
              accept=".pdf,.jpg,.jpeg,.png,image/*,application/pdf"
              className={`w-full rounded-lg border bg-gray-50 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 ${
                errors.pan
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-primary focus:ring-primary/20'
              }`}
              {...register('pan', {
                required: 'PAN Card copy is required',
                validate: {
                  filePresence: (files) =>
                    (files && files.length > 0) || 'Please upload PAN Card file',
                },
              })}
            />
            {errors.pan && <span className="mt-1 text-xs text-red-500">{errors.pan.message}</span>}
          </div>

          {/* Upload Photo */}
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="photo" className="mb-1 text-sm font-semibold text-gray-700">
              Upload Photo (JPG/PNG) *
            </label>
            <input
              type="file"
              id="photo"
              accept=".jpg,.jpeg,.png,image/*"
              className={`w-full rounded-lg border bg-gray-50 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 ${
                errors.photo
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-primary focus:ring-primary/20'
              }`}
              {...register('photo', {
                required: 'Applicant photo is required',
                validate: {
                  filePresence: (files) =>
                    (files && files.length > 0) || 'Please upload your photo',
                },
              })}
            />
            {errors.photo && (
              <span className="mt-1 text-xs text-red-500">{errors.photo.message}</span>
            )}
          </div>

          {/* Address Information Section Heading */}
          <div className="border-gray-150 mt-2 border-t pt-4 md:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-800">
              Address Details
            </h3>
          </div>

          {/* State */}
          <div className="flex flex-col">
            <label htmlFor="state" className="mb-1.5 text-sm font-semibold text-gray-700">
              State *
            </label>
            <select
              id="state"
              className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                errors.state
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-primary focus:ring-primary/20'
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
              <span className="mt-1 text-xs text-red-500">{errors.state.message}</span>
            )}
          </div>

          {/* City */}
          <div className="flex flex-col">
            <label htmlFor="city" className="mb-1.5 text-sm font-semibold text-gray-700">
              City
            </label>
            <input
              type="text"
              id="city"
              placeholder="Enter city"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              {...register('city')}
            />
          </div>

          {/* Postal Code */}
          <div className="flex flex-col">
            <label htmlFor="postal" className="mb-1.5 text-sm font-semibold text-gray-700">
              Postal Code
            </label>
            <input
              type="text"
              id="postal"
              placeholder="6-digit postal code"
              className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 ${
                errors.postal
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-primary focus:ring-primary/20'
              }`}
              {...register('postal', {
                pattern: {
                  value: /^\d{6}$/,
                  message: 'Please enter a valid 6-digit postal code',
                },
              })}
            />
            {errors.postal && (
              <span className="mt-1 text-xs text-red-500">{errors.postal.message}</span>
            )}
          </div>

          {/* Full Address */}
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="address" className="mb-1.5 text-sm font-semibold text-gray-700">
              Full Address
            </label>
            <textarea
              id="address"
              rows="3"
              placeholder="Enter complete residential address"
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              {...register('address')}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 text-center">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 text-sm font-bold shadow-sm md:w-auto md:px-10"
          >
            {isSubmitting ? 'Submitting Application...' : 'Apply Now'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ApplicationForm;
