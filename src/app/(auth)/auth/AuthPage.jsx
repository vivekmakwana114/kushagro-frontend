"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { ADMIN_CREDENTIALS } from "@/lib/mockCredentials";
import { useDispatch } from "react-redux";
import { setUserRole } from "@/state/auth/authSlice";

// Import sub views
import LoginForm from "../../../modules/auth/LoginForm";
import ForgetPasswordForm from "../../../modules/auth/ForgetPasswordForm";
import ResetPasswordForm from "../../../modules/auth/ResetPasswordForm";
import ResetSuccessForm from "../../../modules/auth/ResetSuccessForm";

const AuthPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const [currentView, setCurrentView] = searchParams.get("token")
    ? useState("reset-password")
    : useState("login");
  const [forgotEmail, setForgotEmail] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [loading,setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const handleLogin = async (data) => {
    try {
      if (
        data.email === ADMIN_CREDENTIALS.email &&
        data.password === ADMIN_CREDENTIALS.password
      ) {
        dispatch(setUserRole(ADMIN_CREDENTIALS.role));
        console.log("Logged in as:", ADMIN_CREDENTIALS.role);
        toast.success(`Login successful as ${ADMIN_CREDENTIALS.role}`);
        router.push("/");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (err) {
      toast.error("Login occurred error");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (data) => {
    toast.success("Reset link sent (mock)");
    setCurrentView("reset-success");
  };

  const handleResend = async () => {
    if (!forgotEmail) {
      toast.error("No email to resend (mock)");
      return;
    }
    setLoading(true);
    try {
      console.log("Mock resend link for:", forgotEmail);
      toast.success("Reset link resent (mock)");
    } catch (err) {
      toast.error("Failed to resend link (mock)");
    } finally {
    }
  };

  const handleResetPassword = async (data) => {
    const { password, confirmPassword } = data;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match (mock)");
      return;
    }
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
            setCurrentView={setCurrentView}
          />
        );
      case "forgot-password":
        return (
          <ForgetPasswordForm
            register={register}
            errors={errors}
            emailFocused={emailFocused}
            setEmailFocused={setEmailFocused}
            // handleSubmit={handleSubmit}
            onSubmit={handleForgotPassword}
            onBack={() => setCurrentView("login")}
            handleForgotPassword={handleForgotPassword}
            setCurrentView={setCurrentView}
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
          />
        );
      case "reset-success":
        return (
          <ResetSuccessForm
            onBack={() => setCurrentView("login")}
            onResend={handleResend}
            setCurrentView={setCurrentView}
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
