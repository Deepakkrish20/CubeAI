import { useScrollToTop } from '@/hooks/useScrollToTop';

/**
 * Invisible component that scrolls to top on route changes.
 */
function ScrollToTop() {
  useScrollToTop();
  return null;
}

export default ScrollToTop;
