"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { CiMail } from "react-icons/ci";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ForgotPasswordForm = ({ onSubmit, onBack }) => {
  const [emailFocused, setEmailFocused] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <h3 className="font-semibold text-black mb-2 whitespace-nowrap text-left text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
        Forgot Your Password?
      </h3>
      <p className="text-dull-text text-xs sm:text-sm md:text-base leading-relaxed mb-6">
        Enter your email to reset your password and regain access to your
        account.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4"
      >
        <div className="flex flex-col gap-1">
          <Label htmlFor="email" className="text-sm font-medium text-black">
            Email
          </Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-3 h-12 border border-admin placeholder:text-placeholder-color rounded-lg text-sm sm:text-base"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                },
              })}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
            />
            <CiMail
              size={20}
              className={`absolute top-1/2 left-3 -translate-y-1/2 ${
                emailFocused ? "text-black/50" : "text-dull-text"
              }`}
            />
          </div>
          <p className="text-red-500 text-xs min-h-[1rem]">
            {errors.email?.message}
          </p>
        </div>
        <Button
          type="submit"
          className="w-full bg-secondary1 hover:bg-secondary1/80 text-white h-12 rounded-lg font-medium transition-colors shadow-sm mt-2 cursor-pointer"
        >
          Continue
        </Button>
      </form>

      <div className="mt-6 w-full">
        <p className="text-center text-dull-text text-xs leading-tight">
          Remember your password?{" "}
          <button
            className="text-secondary1 cursor-pointer hover:text-secondary1/80 transition-colors"
            onClick={onBack}
          >
            Log in
          </button>
        </p>
      </div>
    </>
  );
};

export default ForgotPasswordForm;
