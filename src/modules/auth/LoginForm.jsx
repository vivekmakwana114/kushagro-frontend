"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CiMail } from "react-icons/ci";
import { LuLock, LuEye, LuEyeOff } from "react-icons/lu";

const LoginForm = ({
  register,
  errors,
  showPassword,
  setShowPassword,
  emailFocused,
  setEmailFocused,
  passwordFocused,
  setPasswordFocused,
  handleSubmit,
  handleLogin,
  setCurrentView,
}) => {
  return (
    <>
      <h3 className="font-semibold text-black mb-2  text-left text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
        Welcome Back
      </h3>
      <p className="text-dull-text text-xs sm:text-sm md:text-base text-left leading-relaxed mb-6">
        Access your admin dashboard by entering your email and password.
      </p>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-full flex flex-col gap-2"
      >
        {/* Email */}
        <div className="flex flex-col gap-1">
          <Label
            htmlFor="email"
            className="text-xs sm:text-sm font-medium text-black"
          >
            Email
          </Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 h-10 sm:h-12 placeholder:text-placeholder-color border ${
                errors.email ? "border-red-500" : "border-admin"
              } rounded-lg text-sm sm:text-base`}
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
              size={18}
              className={`absolute top-1/2 left-3 -translate-y-1/2 ${
                emailFocused ? "text-black" : "text-placeholder-color"
              }`}
            />
          </div>
          <p className="text-red-500 text-xs min-h-[1rem]">
            {errors.email?.message}
          </p>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <Label
            htmlFor="password"
            className="text-xs sm:text-sm font-medium text-black"
          >
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={`w-full pl-9 sm:pl-10 pr-9 sm:pr-10 py-1.5 sm:py-2 h-10 sm:h-12 placeholder:text-placeholder-color border ${
                errors.password ? "border-red-500" : "border-admin"
              } rounded-lg text-sm sm:text-base`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                  message:
                    "Password must contain uppercase, number, and special char",
                },
              })}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
            <LuLock
              size={18}
              className={`absolute top-1/2 left-3 -translate-y-1/2 ${
                passwordFocused ? "text-black/50" : "text-placeholder-color"
              }`}
            />
            {showPassword ? (
              <LuEyeOff
                size={18}
                onClick={() => setShowPassword(false)}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-black/50"
              />
            ) : (
              <LuEye
                size={18}
                onClick={() => setShowPassword(true)}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-black/50"
              />
            )}
          </div>
          <p className="text-[var(--color-destructive)] text-xs min-h-[1rem]">
            {errors.password?.message}
          </p>
        </div>

        <div className="flex items-center justify-between text-xs sm:text-sm flex-wrap gap-2">
          <div className="flex items-center gap-1 sm:gap-2">
            <Checkbox
              id="rememberMe"
              defaultChecked
              className=" rounded border-admin checked:text-dull-text  text-placeholder-color"
            />
            <label
              htmlFor="rememberMe"
              className="text-placeholder-color whitespace-nowrap cursor-pointer"
            >
              Keep me logged in
            </label>
          </div>
          <button
            type="button"
            className="text-placeholder-color whitespace-nowrap cursor-pointer"
            onClick={() => setCurrentView("forgot-password")}
          >
            Forgot Password?
          </button>
        </div>

        <Button
          type="submit"
          className="bg-secondary1 hover:bg-secondary1/80 text-white h-12 rounded-md mt-2 cursor-pointer"
        >
          Login
        </Button>
      </form>

      <div className="mt-14 w-full">
        <p className="text-center text-[var(--color-dull-text)] text-xs leading-tight">
          This panel is reserved for verified KhushAgro Admin.
        </p>
      </div>
    </>
  );
};

export default LoginForm;
