import PageHeader from '@/components/common/PageHeader';
import ContactForm from '@/components/forms/ContactForm';

function Contact() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with our team"
        breadcrumb="Home / Contact"
      />
      <div className="section-padding container max-w-xl">
        <ContactForm />
      </div>
    </>
  );
}

export default Contact;
