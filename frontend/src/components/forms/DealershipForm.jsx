import { useState } from 'react';
import { useForm } from 'react-hook-form';

function DealershipForm({ onSuccess = () => {} }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      OrganisationName: '',
      fullName: '',
      mobile: '',
      email: '',
      dealerType: '',
      category: 'Distributor',
      financing: 'Financing_TA',
      agreement: 'Agreement_Signed',
      bank_name: '',
      account_number: '',
      ifsc_code: '',
      holder_name: '',
    },
  });

  const validateFileSize = (files) => {
    if (!files || files.length === 0) return true;
    const file = files[0];
    if (file.size > 1024 * 1024) {
      return 'File size must be under 1MB';
    }
    return true;
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      // Simulate API submit delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const payload = {
        ...data,
        aadhaar: data.aadhaar?.[0]
          ? { name: data.aadhaar[0].name, size: data.aadhaar[0].size }
          : null,
        pan: data.pan?.[0] ? { name: data.pan[0].name, size: data.pan[0].size } : null,
        trade: data.trade?.[0] ? { name: data.trade[0].name, size: data.trade[0].size } : null,
        gst: data.gst?.[0] ? { name: data.gst[0].name, size: data.gst[0].size } : null,
        photo: data.photo?.[0] ? { name: data.photo[0].name, size: data.photo[0].size } : null,
        shop_photo: data.shop_photo?.[0]
          ? { name: data.shop_photo[0].name, size: data.shop_photo[0].size }
          : null,
      };

      console.log('--- DEALERSHIP APPLICATION SUBMITTED (SIMULATED) ---');
      console.log('Payload:', payload);

      setSubmitSuccess(true);
      reset();
      onSuccess();
    } catch (err) {
      console.error(err);
      setSubmitError(err.message || 'An error occurred during submission. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {submitSuccess && (
        <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
          Dealership application submitted successfully!
        </div>
      )}

      {submitError && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-gray-700">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Org Name */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">Organisation Name *</label>
            <input
              type="text"
              className={`rounded border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary ${
                errors.OrganisationName ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('OrganisationName', { required: 'Organisation name is required' })}
            />
            {errors.OrganisationName && (
              <span className="mt-1 text-xs text-red-500">{errors.OrganisationName.message}</span>
            )}
          </div>

          {/* Full Name */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">Full Name *</label>
            <input
              type="text"
              className={`rounded border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary ${
                errors.fullName ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('fullName', { required: 'Full name is required' })}
            />
            {errors.fullName && (
              <span className="mt-1 text-xs text-red-500">{errors.fullName.message}</span>
            )}
          </div>

          {/* Mobile */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">Mobile Number *</label>
            <input
              type="tel"
              className={`rounded border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary ${
                errors.mobile ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('mobile', {
                required: 'Mobile number is required',
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: 'Please enter a valid 10-digit mobile number',
                },
              })}
            />
            {errors.mobile && (
              <span className="mt-1 text-xs text-red-500">{errors.mobile.message}</span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">Your Email *</label>
            <input
              type="email"
              className={`rounded border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.email && (
              <span className="mt-1 text-xs text-red-500">{errors.email.message}</span>
            )}
          </div>

          {/* Dealer Type */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">Dealer Type *</label>
            <select
              className={`rounded border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary ${
                errors.dealerType ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('dealerType', { required: 'Please select dealer type' })}
            >
              <option value="">Choose Dealer Type</option>
              <option value="Vehicle">Vehicle</option>
              <option value="Electronics">Electronics</option>
            </select>
            {errors.dealerType && (
              <span className="mt-1 text-xs text-red-500">{errors.dealerType.message}</span>
            )}
          </div>

          {/* Category */}
          <div className="flex flex-col md:col-span-2">
            <span className="mb-1.5 text-sm font-semibold">Category *</span>
            <div className="flex flex-wrap gap-3 py-1">
              {['Distributor', 'Main-Dealer', 'Sub-Dealer', 'Channel-Dealer'].map((cat) => (
                <label key={cat} className="inline-flex items-center text-xs">
                  <input
                    type="radio"
                    value={cat}
                    className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                    {...register('category', { required: true })}
                  />
                  <span className="ml-1.5">{cat.replace('-', ' ')}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Financing */}
          <div className="flex flex-col">
            <span className="mb-1.5 text-sm font-semibold">Financing Facility *</span>
            <div className="flex gap-4 py-1">
              <label className="inline-flex items-center text-xs">
                <input
                  type="radio"
                  value="Financing_TA"
                  className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                  {...register('financing')}
                />
                <span className="ml-1.5">TA</span>
              </label>
              <label className="inline-flex items-center text-xs">
                <input
                  type="radio"
                  value="Financing_NTA"
                  className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                  {...register('financing')}
                />
                <span className="ml-1.5">Non TA</span>
              </label>
            </div>
          </div>

          {/* Agreement Status */}
          <div className="flex flex-col">
            <span className="mb-1.5 text-sm font-semibold">Agreement Status *</span>
            <div className="flex gap-4 py-1">
              <label className="inline-flex items-center text-xs">
                <input
                  type="radio"
                  value="Agreement_Signed"
                  className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                  {...register('agreement')}
                />
                <span className="ml-1.5">Signed</span>
              </label>
              <label className="inline-flex items-center text-xs">
                <input
                  type="radio"
                  value="agreement_NotSigned"
                  className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                  {...register('agreement')}
                />
                <span className="ml-1.5">Not Signed</span>
              </label>
            </div>
          </div>

          {/* Aadhaar Upload */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">
              Upload Aadhaar Card (PDF/JPG/PNG) *
            </label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className={`rounded border bg-gray-50 p-1 text-xs focus:outline-none ${
                errors.aadhaar ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('aadhaar', {
                required: 'Aadhaar copy is required',
                validate: validateFileSize,
              })}
            />
            <small className="mt-0.5 text-gray-400">Max 1MB</small>
            {errors.aadhaar && (
              <span className="mt-1 text-xs text-red-500">{errors.aadhaar.message}</span>
            )}
          </div>

          {/* PAN Upload */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">Upload PAN Card (PDF/JPG/PNG) *</label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className={`rounded border bg-gray-50 p-1 text-xs focus:outline-none ${
                errors.pan ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('pan', {
                required: 'PAN copy is required',
                validate: validateFileSize,
              })}
            />
            <small className="mt-0.5 text-gray-400">Max 1MB</small>
            {errors.pan && <span className="mt-1 text-xs text-red-500">{errors.pan.message}</span>}
          </div>

          {/* Trade Cert */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">
              Upload Trade Certificate (PDF/JPG/PNG)
            </label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="rounded border border-gray-300 bg-gray-50 p-1 text-xs focus:outline-none"
              {...register('trade', { validate: validateFileSize })}
            />
            <small className="mt-0.5 text-gray-400">Max 1MB</small>
            {errors.trade && (
              <span className="mt-1 text-xs text-red-500">{errors.trade.message}</span>
            )}
          </div>

          {/* GST Cert */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">
              Upload GST Certificate (PDF/JPG/PNG)
            </label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="rounded border border-gray-300 bg-gray-50 p-1 text-xs focus:outline-none"
              {...register('gst', { validate: validateFileSize })}
            />
            <small className="mt-0.5 text-gray-400">Max 1MB</small>
            {errors.gst && <span className="mt-1 text-xs text-red-500">{errors.gst.message}</span>}
          </div>

          {/* Photo */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">Upload Photo (PDF/JPG/PNG) *</label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className={`rounded border bg-gray-50 p-1 text-xs focus:outline-none ${
                errors.photo ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('photo', {
                required: 'Photo is required',
                validate: validateFileSize,
              })}
            />
            <small className="mt-0.5 text-gray-400">Max 1MB</small>
            {errors.photo && (
              <span className="mt-1 text-xs text-red-500">{errors.photo.message}</span>
            )}
          </div>

          {/* Shop Photo */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">Upload Shop Photo (PDF/JPG/PNG) *</label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className={`rounded border bg-gray-50 p-1 text-xs focus:outline-none ${
                errors.shop_photo ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('shop_photo', {
                required: 'Shop photo is required',
                validate: validateFileSize,
              })}
            />
            <small className="mt-0.5 text-gray-400">Max 1MB</small>
            {errors.shop_photo && (
              <span className="mt-1 text-xs text-red-500">{errors.shop_photo.message}</span>
            )}
          </div>

          {/* Bank Details Header */}
          <div className="col-span-1 mt-2 border-t pt-4 md:col-span-2">
            <h5 className="text-center text-sm font-bold uppercase text-primary">Bank Details</h5>
          </div>

          {/* Bank Name */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">Bank Name *</label>
            <input
              type="text"
              className={`rounded border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary ${
                errors.bank_name ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('bank_name', { required: 'Bank name is required' })}
            />
            {errors.bank_name && (
              <span className="mt-1 text-xs text-red-500">{errors.bank_name.message}</span>
            )}
          </div>

          {/* A/c Number */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">A/c Number *</label>
            <input
              type="text"
              className={`rounded border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary ${
                errors.account_number ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('account_number', { required: 'Account number is required' })}
            />
            {errors.account_number && (
              <span className="mt-1 text-xs text-red-500">{errors.account_number.message}</span>
            )}
          </div>

          {/* IFSC */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">IFSC Code *</label>
            <input
              type="text"
              className={`rounded border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary ${
                errors.ifsc_code ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('ifsc_code', {
                required: 'IFSC code is required',
                pattern: {
                  value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
                  message: 'Please enter a valid 11-digit IFSC code (e.g. SBIN0012345)',
                },
              })}
            />
            {errors.ifsc_code && (
              <span className="mt-1 text-xs text-red-500">{errors.ifsc_code.message}</span>
            )}
          </div>

          {/* Holder Name */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold">A/c Holder Name *</label>
            <input
              type="text"
              className={`rounded border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary ${
                errors.holder_name ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register('holder_name', { required: 'Account holder name is required' })}
            />
            {errors.holder_name && (
              <span className="mt-1 text-xs text-red-500">{errors.holder_name.message}</span>
            )}
          </div>
        </div>

        <div className="mt-4 border-t pt-4 text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-primary py-3 text-sm font-bold text-white shadow-sm transition hover:bg-primary/95 disabled:opacity-50 md:w-auto md:px-10"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default DealershipForm;
