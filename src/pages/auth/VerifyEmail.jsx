import React from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import api from '../../lib/api';
import toast from 'react-hot-toast';

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [status, setStatus] = React.useState('pending'); // pending | success | error
  const [message, setMessage] = React.useState('Confirming your email...');

  React.useEffect(() => {
    let mounted = true;
    async function confirm() {
      if (!token) {
        setStatus('error');
        setMessage('Missing verification token.');
        toast.error('Missing verification token');
        return;
      }
      try {
        await api.post('/auth/verify', { token });
        if (!mounted) return;
        setStatus('success');
        setMessage('Your email has been verified. You can now log in.');
        toast.success('Email verified successfully');
      } catch (err) {
        if (!mounted) return;
        setStatus('error');
        setMessage(err?.message || 'Verification failed.');
        toast.error(err?.message || 'Verification failed');
      }
    }
    confirm();
    return () => { mounted = false; };
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 text-center">
        <h1 className="text-2xl font-semibold mb-2">Email Confirmation</h1>
        <p className={`text-sm ${status === 'error' ? 'text-red-600' : 'text-gray-700'}`}>{message}</p>
        <div className="mt-6 space-x-4">
          {status === 'success' && (
            <Link to="/login" className="text-violet-700 hover:underline">Go to Login</Link>
          )}
          {status === 'error' && (
            <button onClick={() => navigate('/verify-notice')} className="text-violet-700 hover:underline">
              Resend / Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
