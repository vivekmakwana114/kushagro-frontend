"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  sendForgotPassword,
  verifyOtp,
  performResetPassword,
} from "@/state/auth/authSlice";

// Import sub views
import LoginForm from "../../../modules/auth/LoginForm";
import ForgetPasswordForm from "../../../modules/auth/ForgetPasswordForm";
import VerifyOtpForm from "../../../modules/auth/VerifyOtpForm";
import ResetPasswordForm from "../../../modules/auth/ResetPasswordForm";
import ResetSuccessForm from "../../../modules/auth/ResetSuccessForm";

const AuthPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const [currentView, setCurrentView] = useState("login");
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  // Redux state
  const {
    status,
    error,
    user,
    verifyStatus,
    resetStatus,
    forgotPasswordMessage,
  } = useSelector((state) => state.auth);
  const loading =
    status === "loading" ||
    verifyStatus === "loading" ||
    resetStatus === "loading";

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");


  // Handle Login Success/Error
  useEffect(() => {
    if (status === "succeeded" && user) {
      toast.dismiss();
      toast.success("Login successful");
      router.push("/");
    }
    if (status === "failed" && error) {
      toast.dismiss();
      toast.error(error);
    }
  }, [status, user, error, router]);

  // Clear forms and state when view changes to main entry points
  useEffect(() => {
    if (currentView === "login") {
      reset(); 
      setOtp("");
      setForgotEmail("");
    } else if (currentView === "forgot-password") {
      reset();
      setOtp("");
      setForgotEmail("");
    }
  }, [currentView, reset]);

  // login function
  const handleLogin = (data) => {
    toast.loading("Logging in...");
    dispatch(loginUser(data));
  };

  // forget password
  const handleForgotPassword = () => {
    setCurrentView("forgot-password");
  };

  // send forgot password
  const handleSendForgotPassword = (data) => {
    if (!data.email) return;
    setForgotEmail(data.email);
    toast.loading("Sending 4-digit code...");
    dispatch(sendForgotPassword(data.email))
      .unwrap()
      .then(() => {
        toast.dismiss();
        toast.success("OTP sent. Please check your mail.");
        setCurrentView("verify-otp");
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err.message || "Failed to send OTP");
      });
  };

  // resend otp
  const handleResend = () => {
    if (!forgotEmail) {
      toast.error("No email to resend");
      return;
    }
    toast.loading("Resending code...");
    dispatch(sendForgotPassword(forgotEmail))
      .unwrap()
      .then(() => {
        toast.dismiss();
        toast.success("Code resent successfully");
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err.message || "Failed to resend code");
      });
  };

  // verify otp
  const handleVerifyOtp = () => {
    if (otp.length !== 4) {
      toast.error("Please enter a valid 4-digit OTP");
      return;
    }
    toast.loading("Verifying OTP...");
    dispatch(verifyOtp({ email: forgotEmail, otp }))
      .unwrap()
      .then((res) => {
        toast.dismiss();
        toast.success("OTP Verified");

        setCurrentView("reset-password");
      })
      .catch((err) => {
        const msg = err.message || "";
        // If user is already verified (account status), treat OTP check as passed for password reset flow
        // and assume OTP is the token since we didn't get one from the failed response.
        if (msg.toLowerCase().includes("already verified")) {
          toast.dismiss();
          toast.success("OTP Verified");
          setCurrentView("reset-password");
        } else {
          toast.dismiss();
          toast.error(msg || "Invalid OTP");
        }
      });
  };

  // reset password
  const handleResetPassword = (data) => {
    const { password, confirmPassword } = data;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // We strictly use OTP flow now
    if (!otp || !forgotEmail) {
      toast.error("Missing OTP or Email verification");
      return;
    }

    toast.loading("Resetting password...");
    dispatch(
      performResetPassword({
        email: forgotEmail,
        password,
        otp,
      })
    )
      .unwrap()
      .then(() => {
        toast.dismiss();
        toast.success("password changed successful");
        setCurrentView("login");
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err.message || "Failed to reset password");
      });
  };

  const renderForm = () => {
    switch (currentView) {
      case "login":
        return (
          <LoginForm
            register={register}
            errors={errors}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            emailFocused={emailFocused}
            setEmailFocused={setEmailFocused}
            passwordFocused={passwordFocused}
            setPasswordFocused={setPasswordFocused}
            handleSubmit={handleSubmit}
            handleLogin={handleLogin}
            handleForgotPassword={handleForgotPassword}
            loading={loading}
          />
        );
      case "forgot-password":
        return (
          <ForgetPasswordForm
            register={register}
            errors={errors}
            emailFocused={emailFocused}
            setEmailFocused={setEmailFocused}
            onSubmit={handleSendForgotPassword}
            onBack={() => setCurrentView("login")}
            setCurrentView={setCurrentView}
            loading={loading}
          />
        );
      case "verify-otp":
        return (
          <VerifyOtpForm
            otp={otp}
            setOtp={setOtp}
            onVerify={handleVerifyOtp}
            onResend={handleResend}
            onBack={() => setCurrentView("login")}
            loading={loading}
          />
        );
      case "reset-password":
        return (
          <ResetPasswordForm
            register={register}
            errors={errors}
            password={password}
            confirmPassword={confirmPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
            passwordFocused={passwordFocused}
            setPasswordFocused={setPasswordFocused}
            confirmPasswordFocused={confirmPasswordFocused}
            setConfirmPasswordFocused={setConfirmPasswordFocused}
            onSubmit={handleResetPassword}
            onBack={() => setCurrentView("login")}
            handleResetPassword={handleResetPassword}
            setCurrentView={setCurrentView}
            loading={loading}
          />
        );
      case "reset-success":
        return (
          <ResetSuccessForm
            onBack={() => setCurrentView("login")}
            onResend={handleResend}
            setCurrentView={setCurrentView}
            loading={loading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-background px-4">
      {/* Spacer for logo height */}
      <div className="mt-12 sm:mt-16 h-12 sm:h-14"></div>

      {/* Form container */}
      <div className="w-full max-w-[420px] mt-8 sm:mt-12">{renderForm()}</div>
    </div>
  );
};

export default AuthPage;
