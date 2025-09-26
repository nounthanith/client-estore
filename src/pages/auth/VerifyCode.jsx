import React from 'react';
import Input from '../../components/Input';
import api from '../../lib/api';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function VerifyCode() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialEmail = location.state?.email || '';

  const [email, setEmail] = React.useState(initialEmail);
  const [code, setCode] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [resending, setResending] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    if (!email) { toast.error('Email is required'); valid = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { toast.error('Enter a valid email'); valid = false; }
    if (!code) { toast.error('Code is required'); valid = false; }
    if (!valid) return;

    try {
      setSubmitting(true);
      await toast.promise(
        api.post('/auth/verify', { email, code }),
        {
          loading: 'Verifying...',
          success: 'Email verified successfully. You can now log in.',
          error: (err) => err?.message || 'Verification failed',
        }
      );
      setTimeout(() => navigate('/login'), 1000);
    } catch (err) {
      if (err) toast.error(err?.message || 'Verification failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!email) { toast.error('Email is required'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { toast.error('Enter a valid email'); return; }

    try {
      setResending(true);
      await toast.promise(
        api.post('/auth/resend', { email }),
        {
          loading: 'Resending code...',
          success: 'Verification code resent. Check your inbox.',
          error: (err) => err?.message || 'Failed to resend code',
        }
      );
    } catch (err) {
      if (err) toast.error(err?.message || 'Failed to resend code');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-semibold text-center mb-1">Enter Verification Code</h1>
        <p className="text-center text-sm text-gray-500 mb-6">We sent a code to your email. Enter it below to verify your account.</p>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <Input
            label="Email"
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <Input
            label="Verification Code"
            id="code"
            name="code"
            placeholder="Enter the code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="tracking-widest"
          />

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className={`text-sm ${resending ? 'text-gray-400' : 'text-violet-700 hover:underline'}`}
            >
              {resending ? 'Resending...' : 'Resend code'}
            </button>
            <Link to="/login" className="text-sm text-gray-600 hover:underline">Back to login</Link>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`w-full px-4 py-2 rounded-lg text-white transition ${
              submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-violet-600 hover:bg-violet-700 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2'
            }`}
          >
            {submitting ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyCode;
