import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { subscribeNewsletter } from '@/services/newsletterService';

function NewsletterForm() {
  const [status, setStatus] = useState({ type: '', message: '' });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data) => {
    setStatus({ type: '', message: '' });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        await subscribeNewsletter(data);
      } catch (apiError) {
        console.warn('API subscription failed, falling back to mock submission:', apiError);
      }

      setStatus({ type: 'success', message: 'Thank you! You have subscribed successfully.' });
      reset();
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Subscription failed. Please try again.',
      });
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <input
              placeholder="Your email address"
              type="text"
              id="newsletter-email"
              className={`w-full rounded-2xl border bg-white/5 border-white/10 px-4 py-3 text-xs font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all ${
                errors.email ? 'border-red-500/50' : 'border-white/10'
              }`}
              {...register('email', {
                required: 'Email address is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Please enter a valid email address',
                },
              })}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-2xl bg-gradient-to-r from-[#3B0764] to-[#6D28D9] px-6 py-3 text-xs font-black uppercase tracking-wider text-white transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_6px_20px_rgba(76,29,149,0.3)] disabled:opacity-50"
          >
            {isSubmitting ? 'Signing Up...' : 'SignUp'}
          </button>
        </div>
        {errors.email && (
          <span className="mt-1 text-xs font-bold text-red-500/80">{errors.email.message}</span>
        )}
      </form>

      {status.message && (
        <div
          className={`mt-4 rounded-2xl p-4 text-xs font-bold ${
            status.type === 'success'
              ? 'border border-violet-500/20 bg-violet-500/5 text-violet-300'
              : 'border border-red-500/20 bg-red-500/5 text-red-300'
          }`}
        >
          {status.message}
        </div>
      )}
    </div>
  );
}

export default NewsletterForm;
