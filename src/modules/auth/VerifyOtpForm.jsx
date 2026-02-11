"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

const VerifyOtpForm = ({
  otp,
  setOtp,
  onVerify,
  onResend,
  onBack,
  loading,
}) => {
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = otp.split("");
    newOtp[index] = value.substring(value.length - 1);
    const combinedOtp = newOtp.join("");
    setOtp(combinedOtp);

    // Move to next input if value is entered
    if (value && index < 3 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    // Optional: if previous empty, focus that instead
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Move to previous input on backspace if empty
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <>
      <h3 className="font-semibold text-black mb-2 text-left text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
        Enter OTP
      </h3>
      <p className="text-dull-text text-xs sm:text-sm md:text-base text-left leading-relaxed mb-6">
        We have sent a 4-digit code to your email.
      </p>

      <div className="flex flex-col gap-6 w-full">
        <div className="flex justify-center gap-2">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              type="text"
              value={otp[index] || ""}
              onChange={(e) => handleChange(index, e.target.value)}
              onClick={() => handleClick(index)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 sm:w-14 sm:h-14 border border-admin rounded-lg text-lg text-center focus:outline-none focus:border-black transition-colors"
            />
          ))}
        </div>

        <Button
          onClick={onVerify}
          disabled={loading || otp.length !== 4}
          className="bg-secondary1 hover:bg-secondary1/80 text-white h-12 rounded-md cursor-pointer w-full"
        >
          {loading ? "Verifying..." : "Verify Code"}
        </Button>

        <div className="flex items-center justify-between text-xs sm:text-sm">
          <button
            type="button"
            className="text-placeholder-color hover:text-black transition-colors"
            onClick={onBack}
          >
            Back to Login
          </button>
          <button
            type="button"
            className="text-secondary1 font-medium hover:underline invalid:text-gray-400 disabled:text-gray-400"
            onClick={onResend}
            disabled={loading}
          >
            Resend Code
          </button>
        </div>
      </div>
    </>
  );
};

export default VerifyOtpForm;
