import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import Button from '@/components/ui/Button';

function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="mt-4 text-xl text-text-muted">Page not found</p>
      <p className="mt-2 text-text-light">The page you are looking for does not exist.</p>
      <Link to={ROUTES.HOME} className="mt-8">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
}

export default NotFound;
