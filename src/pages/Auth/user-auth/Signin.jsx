import React, { useState } from "react";
import BacktoHome from "../../../components/btns/BacktoHome";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useSignin } from "../../../hooks/auth/useSignin";
import { Link } from "react-router-dom";

const SignIn = () => {
  const { signin, loading, error } = useSignin();

  const [form, setForm] = useState({
    email: "",
    password: "",
    privacy_policy: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signin(form);
  };

  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center px-4">
      {/* Back Button */}
      <div className="absolute top-4 right-5">
        <BacktoHome />
      </div>

      <div className="w-full max-w-5xl mx-auto flex  overflow-hidden">
        {/* LEFT PANEL */}
        <div className="hidden md:flex w-1/2 relative">
          <img
            src="https://images.pexels.com/photos/210205/pexels-photo-210205.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Student housing"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-10 p-8 flex flex-col justify-between w-full">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-white flex items-center justify-center">
                🏠
              </div>
              <span className="text-white font-semibold text-sm">
                Alive Paris
              </span>
            </div>

            <div>
              <h2 className="text-white text-3xl font-semibold leading-snug">
                Find your perfect student room near campus.
              </h2>
              <p className="mt-3 text-sm text-gray-200 max-w-sm">
                Modern, furnished rooms with Wi-Fi, study spaces, and friendly
                student communities.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-md px-6 py-10">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-gray-900">
                Sign in
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Log in to manage bookings, shortlist rooms, and chat with landlords.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* EMAIL */}
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />

              {/* PASSWORD */}
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              {/* PRIVACY */}
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  name="privacy_policy"
                  checked={form.privacy_policy}
                  onChange={handleChange}
                  className="accent-black"
                  required
                />
                Agree to privacy policy
              </label>
              
              <Link to='/forgot-password'>Forgot Password?</Link>

              {error && (
                <p className="text-red-600 text-sm">{error}</p>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-900 transition disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>

              {/* DIVIDER */}
              <div className="flex items-center my-4">
                <div className="flex-grow h-px bg-gray-300" />
                <span className="mx-3 text-xs font-semibold text-gray-500">
                  OR
                </span>
                <div className="flex-grow h-px bg-gray-300" />
              </div>

              {/* GOOGLE */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2.5 rounded-lg hover:bg-gray-50 transition"
              >
                <FcGoogle size={18} />
                Continue with Google
              </button>
            </form>

            <p className="mt-6 text-xs text-gray-500 text-center">
              New to CampusRooms?{" "}
              <a
                href="/signup"
                className="font-semibold text-gray-900 hover:underline"
              >
                Create a free student account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
