/**
 * Reusable page header component for inner pages.
 * Full styling will be implemented during UI build phase.
 */
function PageHeader({ title, subtitle, breadcrumb }) {
  return (
    <section className="relative overflow-hidden bg-white py-16 text-gray-900">
      {/* Animated Grid Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          animation: 'gridScroll 20s linear infinite'
        }}
      />
      <style>{`
        @keyframes gridScroll {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 50px 50px;
          }
        }
      `}</style>
      
      <div className="container relative z-10">
        {breadcrumb && <p className="mb-2 text-sm text-gray-500">{breadcrumb}</p>}
        <h1 className="text-3xl font-bold text-[#4C1D95] md:text-4xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-gray-600">{subtitle}</p>}
      </div>
    </section>
  );
}

export default PageHeader;
