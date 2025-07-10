import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

function NotFoundPage() {
  return (
    <PageLayout>
      <div className="not-found-page text-center">
        <h1 className="mb-md">404</h1>
        <h2 className="mb-lg">Page Not Found</h2>
        <p className="mb-xl">The page you are looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn btn-primary btn-lg">
          Return to Home
        </Link>
      </div>
    </PageLayout>
  );
}

export default NotFoundPage;