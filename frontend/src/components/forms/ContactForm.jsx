import { useForm } from 'react-hook-form';
import { submitContactForm } from '@/services/contactService';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';

/**
 * Contact form with React Hook Form integration.
 * Wired to backend API — UI styling in next phase.
 */
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
      // Toast notification can be added in UI phase
      alert('Message sent successfully!');
    } catch (error) {
      alert(error.message || 'Failed to send message.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Name"
        {...register('name', { required: 'Name is required' })}
        error={errors.name?.message}
      />
      <Input
        label="Email"
        type="email"
        {...register('email', { required: 'Email is required' })}
        error={errors.email?.message}
      />
      <Input
        label="Phone"
        {...register('phone', { required: 'Phone is required' })}
        error={errors.phone?.message}
      />
      <Input
        label="Subject"
        {...register('subject', { required: 'Subject is required' })}
        error={errors.subject?.message}
      />
      <Textarea
        label="Message"
        {...register('message', { required: 'Message is required' })}
        error={errors.message?.message}
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}

export default ContactForm;
