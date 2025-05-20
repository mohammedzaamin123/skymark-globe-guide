
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-skymark-bg px-4">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(155,135,245,0.15),transparent_45%)]"></div>
      </div>
      <div className="z-10 text-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-4 text-skymark">404</h1>
        <h2 className="text-2xl md:text-3xl text-white mb-6">Page Not Found</h2>
        <p className="text-gray-400 mb-8 max-w-md">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="space-y-4">
          <Link to="/" className="bg-skymark hover:bg-skymark-dark text-white px-6 py-3 rounded-md inline-block">
            Return to Home
          </Link>
          <div className="block">
            <Link to="/chat" className="text-skymark hover:underline inline-block mt-4">
              Chat with Skymark
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
