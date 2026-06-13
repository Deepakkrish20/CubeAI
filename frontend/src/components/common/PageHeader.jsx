/**
 * Reusable page header component for inner pages.
 * Full styling will be implemented during UI build phase.
 */
function PageHeader({ title, subtitle, breadcrumb }) {
  return (
    <section className="bg-primary py-16 text-white">
      <div className="container">
        {breadcrumb && <p className="mb-2 text-sm text-primary-300">{breadcrumb}</p>}
        <h1 className="text-3xl font-bold text-white md:text-4xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-primary-200">{subtitle}</p>}
      </div>
    </section>
  );
}

export default PageHeader;
