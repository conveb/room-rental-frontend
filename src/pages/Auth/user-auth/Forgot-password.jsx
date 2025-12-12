import React from "react";
import BacktoHome from "../../../components/btns/BacktoHome";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
const ForgotPassword = () => {
  return (
    <div className="relative min-h-dvh bg-gray-50 flex items-center justify-center px-4 md:px-20">
      {/* Back to Home Button */}
      <div className="absolute top-5 right-5">
        <BacktoHome />
      </div>

      {/* Centered Form Card */}
      <div className="w-full max-w-md  p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 text-start mb-4">
          Forgot Password
        </h1>
        <p className="text-sm md:text-base text-gray-500 text-start mb-8">
          Enter your email address below and we'll send you a link to reset your password.
        </p>

        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="student@university.edu"
              className="mt-1 block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 inline-flex justify-center rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-900 transition"
          >
            Send Reset Link
          </button>
        </form>

        <div className="mt-6 flex items-center">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="px-3 text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="mt-4 w-full">
          {/* <button className="flex items-center justify-center space-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
            <span className="text-blue-600">F</span>
            <span> Facebook</span>
          </button> */}
          <button className="flex items-center justify-center w-full space-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
            <FcGoogle/>
            <span> Google</span>
          </button>
        </div>

        <p className="mt-6 text-xs text-gray-500 text-center">
          Remember your password?{" "}
          <a href="/signin" className="font-semibold text-gray-900 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
