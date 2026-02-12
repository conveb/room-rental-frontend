import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";

import BacktoHome from "../../../components/btns/BacktoHome";
import { useSignin } from "../../../hooks/auth/useSignin";
import { useGoogleAuth } from "../../../hooks/auth/useGoogleAuth";

const SignIn = () => {
  const { signin, loading: manualLoading, error: manualError } = useSignin();
  const { loading: googleLoading, error: googleError } = useGoogleAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);


  const loginWithGoogle = useGoogleLogin({
    flow: 'auth-code',
    ux_mode: 'redirect',
    redirect_uri: "https://www.aliveparis.com/signin",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signin(form);
  };

  // 2. Combined loading state
  const isProcessing = manualLoading || googleLoading;

  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center px-4">
      <div className="absolute top-4 right-5">
        <BacktoHome />
      </div>

      <div className="w-full max-w-5xl mx-auto flex overflow-hidden ">
        {/* LEFT PANEL */}
        

        {/* RIGHT PANEL */}
        <div className="w-full  flex items-center justify-center bg-white">
          <div className="w-full max-w-md px-6 py-10">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-gray-900">Sign in</h1>
              <p className="mt-1 text-sm text-gray-500">
                Sign in to explore available properties and secure your stay today.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-black outline-none"
                required
              />

              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-black outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              <div className="flex justify-end">
                <Link to='/forgot-password' className="text-sm text-black hover:underline">
                  Forgot Password?
                </Link>
              </div>

              {/* ERROR DISPLAY */}
              {(manualError || googleError) && (
                <p className="text-red-600 text-sm bg-red-50 p-2 rounded">{manualError || googleError}</p>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50"
              >
                {manualLoading ? "Signing in..." : "Sign in"}
              </button>

              <div className="flex items-center my-4">
                <div className="flex-grow h-px bg-gray-200" />
                <span className="mx-3 text-xs font-semibold text-gray-400">OR</span>
                <div className="flex-grow h-px bg-gray-200" />
              </div>

              {/* GOOGLE LOGIN BUTTON */}
              <button
                type="button"
                onClick={() => loginWithGoogle()}
                disabled={googleLoading}
                className="flex gap-3 items-center justify-center border p-2 w-full rounded-xl"
              >
                <FcGoogle />  {googleLoading ? "Processing..." : "Sign in with Google"}
              </button>
            </form>

            <p className="mt-6 text-xs text-gray-500 text-center">
              New to Alive Paris?{" "}
              <Link to="/signup" className="font-semibold text-gray-900 hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;