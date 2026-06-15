import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { submitContactForm } from '@/services/contactService';
import Button from '@/components/ui/Button';

function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await submitContactForm(data);
      reset();
      alert('Message sent successfully!');
    } catch (error) {
      alert(error.message || 'Failed to send message.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-white/70 backdrop-blur-md p-6 sm:p-8 rounded-[32px] border border-gray-200/50 shadow-[0_16px_48px_rgba(15,23,42,0.03)]"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Name Field */}
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2 text-xs font-bold text-gray-700 uppercase tracking-wider">
              Name *
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your name"
              className={`w-full rounded-2xl border bg-white px-4 py-3.5 text-sm font-semibold transition-all focus:outline-none focus:ring-4 ${
                errors.name
                  ? 'border-red-500 focus:ring-red-500/10'
                  : 'border-gray-200 focus:border-[#00D09C] focus:ring-[#00D09C]/5'
              }`}
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <span className="mt-1 text-xs text-red-500 font-medium">{errors.name.message}</span>
            )}
          </div>

          {/* Email Field */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 text-xs font-bold text-gray-700 uppercase tracking-wider">
              Email *
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your email address"
              className={`w-full rounded-2xl border bg-white px-4 py-3.5 text-sm font-semibold transition-all focus:outline-none focus:ring-4 ${
                errors.email
                  ? 'border-red-500 focus:ring-red-500/10'
                  : 'border-gray-200 focus:border-[#00D09C] focus:ring-[#00D09C]/5'
              }`}
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && (
              <span className="mt-1 text-xs text-red-500 font-medium">{errors.email.message}</span>
            )}
          </div>

          {/* Phone Field */}
          <div className="flex flex-col">
            <label htmlFor="phone" className="mb-2 text-xs font-bold text-gray-700 uppercase tracking-wider">
              Phone *
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="Mobile number"
              className={`w-full rounded-2xl border bg-white px-4 py-3.5 text-sm font-semibold transition-all focus:outline-none focus:ring-4 ${
                errors.phone
                  ? 'border-red-500 focus:ring-red-500/10'
                  : 'border-gray-200 focus:border-[#00D09C] focus:ring-[#00D09C]/5'
              }`}
              {...register('phone', { required: 'Phone is required' })}
            />
            {errors.phone && (
              <span className="mt-1 text-xs text-red-500 font-medium">{errors.phone.message}</span>
            )}
          </div>

          {/* Subject Field */}
          <div className="flex flex-col">
            <label htmlFor="subject" className="mb-2 text-xs font-bold text-gray-700 uppercase tracking-wider">
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              placeholder="Inquiry topic"
              className={`w-full rounded-2xl border bg-white px-4 py-3.5 text-sm font-semibold transition-all focus:outline-none focus:ring-4 ${
                errors.subject
                  ? 'border-red-500 focus:ring-red-500/10'
                  : 'border-gray-200 focus:border-[#00D09C] focus:ring-[#00D09C]/5'
              }`}
              {...register('subject', { required: 'Subject is required' })}
            />
            {errors.subject && (
              <span className="mt-1 text-xs text-red-500 font-medium">{errors.subject.message}</span>
            )}
          </div>

          {/* Message Field */}
          <div className="flex flex-col sm:col-span-2">
            <label htmlFor="message" className="mb-2 text-xs font-bold text-gray-700 uppercase tracking-wider">
              Message *
            </label>
            <textarea
              id="message"
              rows="4"
              placeholder="How can we help you?"
              className={`w-full resize-none rounded-2xl border bg-white px-4 py-3.5 text-sm font-semibold transition-all focus:outline-none focus:ring-4 ${
                errors.message
                  ? 'border-red-500 focus:ring-red-500/10'
                  : 'border-gray-200 focus:border-[#00D09C] focus:ring-[#00D09C]/5'
              }`}
              {...register('message', { required: 'Message is required' })}
            />
            {errors.message && (
              <span className="mt-1 text-xs text-red-500 font-medium">{errors.message.message}</span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 text-xs font-extrabold uppercase tracking-wider bg-gradient-to-r from-[#006B50] to-[#00B386] shadow-[0_8px_24px_rgba(0, 208, 156,0.18)] hover:shadow-[0_12px_30px_rgba(0, 208, 156,0.28)]"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}

export default ContactForm;
