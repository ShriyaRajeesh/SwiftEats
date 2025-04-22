import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000000]">
      <div className="bg-[#222222] p-8 rounded-lg shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-bold text-[#1DCD9F] mb-4">403 - Unauthorized</h1>
        <p className="text-white mb-6">
          You don't have permission to access this page.
        </p>
        <Link
          to="/"
          className="bg-[#1DCD9F] text-white px-6 py-2 rounded hover:bg-[#169976] transition duration-200"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;