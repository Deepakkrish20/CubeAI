import PageHeader from '@/components/common/PageHeader';
import ApplicationForm from '@/components/forms/ApplicationForm';

function ApplyNow() {
  return (
    <>
      <PageHeader
        title="Apply Now"
        subtitle="Start your loan application today"
        breadcrumb="Home / Apply Now"
      />
      <div className="section-padding container max-w-xl">
        <ApplicationForm />
      </div>
    </>
  );
}

export default ApplyNow;
