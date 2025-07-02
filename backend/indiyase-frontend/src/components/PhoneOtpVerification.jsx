import React, { useState, useEffect } from "react";
import { auth } from "../firebase"; // adjust path if needed
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const PhoneOtpVerification = ({ onVerified }) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [step, setStep] = useState(1);

  useEffect(() => {
    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: (response) => {
              console.log("reCAPTCHA solved", response);
            },
          },
          auth
        );
      }
    } catch (err) {
      console.error("reCAPTCHA setup error:", err);
    }
  }, []);

  const sendOtp = async () => {
    try {
      const appVerifier = window.recaptchaVerifier;
      const fullPhone = "+91" + phone;

      const result = await signInWithPhoneNumber(auth, fullPhone, appVerifier);
      setConfirmationResult(result);
      setStep(2);
    } catch (error) {
      console.error("OTP error:", error);
      alert("Failed to send OTP. Please check the number.");
    }
  };

  const verifyOtp = async () => {
    try {
      await confirmationResult.confirm(otp);
      alert("Phone number verified!");
      onVerified(); // Notify parent
    } catch (error) {
      console.error("OTP Verification Error:", error);
      alert("Incorrect OTP. Try again.");
    }
  };

  return (
    <div className="p-4 border rounded bg-white shadow max-w-md mx-auto">
      {step === 1 ? (
        <>
          <h2 className="text-lg font-bold mb-2">Verify Your Phone</h2>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number without +91"
            className="border p-2 mb-2 w-full"
          />
          <button
            onClick={sendOtp}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            Send OTP
          </button>
        </>
      ) : (
        <>
          <h2 className="text-lg font-bold mb-2">Enter OTP</h2>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6-digit OTP"
            className="border p-2 mb-2 w-full"
          />
          <button
            onClick={verifyOtp}
            className="bg-green-600 text-white px-4 py-2 rounded w-full"
          >
            Verify OTP
          </button>
        </>
      )}

      {/* Required for reCAPTCHA */}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default PhoneOtpVerification;
