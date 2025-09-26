import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function VerifyNotice() {
  const location = useLocation();
  const email = location.state?.email;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 text-center">
        <h1 className="text-2xl font-semibold mb-2">Verify your email</h1>
        <p className="text-sm text-gray-600">
          We sent a verification link {email ? `to ${email}` : ''}. Please check your inbox and click the link to activate your account.
        </p>
        <p className="text-xs text-gray-500 mt-2">If you don't see it, check your spam folder.</p>
        <div className="mt-6">
          <Link to="/login" className="text-blue-600 hover:underline">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}

export default VerifyNotice;
