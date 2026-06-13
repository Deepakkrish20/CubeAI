import { FiPhone, FiMail, FiClock, FiMapPin } from 'react-icons/fi';
import { CONTACT_INFO } from '@/constants/config';

function TopHeader() {
  return (
    <div
      id="top-header"
      className="hidden w-full border-b border-gray-200 bg-gray-100 py-2 md:block"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <FiMapPin className="h-4 w-4" aria-hidden="true" />
          <span>{CONTACT_INFO.location}</span>
        </div>

        <a
          href={`mailto:${CONTACT_INFO.email}`}
          className="flex items-center gap-2 hover:underline"
        >
          <FiMail className="h-4 w-4" aria-hidden="true" />
          <span>{CONTACT_INFO.email}</span>
        </a>

        <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center gap-2 hover:underline">
          <FiPhone className="h-4 w-4" aria-hidden="true" />
          <span>{CONTACT_INFO.phone}</span>
        </a>

        <div className="flex items-center gap-2">
          <FiClock className="h-4 w-4" aria-hidden="true" />
          <span>{CONTACT_INFO.hours}</span>
        </div>
      </div>
    </div>
  );
}

export default TopHeader;
