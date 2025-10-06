import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


const LoadingPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 8000);
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="w-14 h-14 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>

        {/* Text */}
        <p className="mt-4 text-white font-medium">
          Loading...
        </p>
      </div>
    </div>
  );
}

export default LoadingPage;

