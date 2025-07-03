import React, { useState, useEffect } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../firebase';

const PhoneOtpVerification = ({ phone, onVerify, onCancel }) => {
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Initialize recaptcha when component mounts
    const initializeRecaptcha = async () => {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
        });
      } catch (err) {
        console.error('Recaptcha error:', err);
        setError('Failed to set up recaptcha');
      }
    };

    initializeRecaptcha();
    sendOtp();

    return () => {
      // Clean up recaptcha when component unmounts
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
      }
    };
  }, []);

  const sendOtp = async () => {
    try {
      setLoading(true);
      setError('');
      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier);
      setVerificationId(confirmation);
      setLoading(false);
    } catch (err) {
      console.error('OTP send error:', err);
      setError('Failed to send OTP. Please try again.');
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      if (!otp || otp.length !== 6) {
        setError('Please enter a 6-digit OTP');
        return;
      }

      setLoading(true);
      setError('');
      await verificationId.confirm(otp);
      onVerify();
      setLoading(false);
    } catch (err) {
      console.error('OTP verification error:', err);
      setError('Invalid OTP. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded bg-gray-50 mt-2">
      {!verificationId ? (
        <div>
          <p className="mb-2">We'll send an OTP to {phone}</p>
          <button
            onClick={sendOtp}
            disabled={loading}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        </div>
      ) : (
        <div>
          <p className="mb-2">Enter OTP sent to {phone}</p>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="Enter 6-digit OTP"
            className="w-full p-2 border rounded"
            maxLength="6"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={verifyOtp}
              disabled={loading || otp.length !== 6}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default PhoneOtpVerification;