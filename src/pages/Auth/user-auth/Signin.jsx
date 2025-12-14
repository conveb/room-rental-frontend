import React, { useState } from "react";
import BacktoHome from "../../../components/btns/BacktoHome";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useAuth } from "../../../hooks/auth/useAuth";

const SignIn = () => {
  const { signin, loading, error } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signin(form);
  };
  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center">
      <div className="absolute top-0 right-5">
        <BacktoHome />
      </div>
      <div className="w-full max-w-5xl mx-auto flex bg-white">
        {/* Left panel */}
        <div className="hidden md:flex w-1/2 flex-col rounded-3xl overflow-hidden shadow-xl">
          <div className="relative h-full">
            <img
              src="https://images.pexels.com/photos/210205/pexels-photo-210205.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Student housing"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute top-6 left-6 flex items-center space-x-2">
              <div className="h-8 w-8 rounded-xl bg-white/90 flex items-center justify-center">
                <span className="text-sm font-semibold">🏠</span>
              </div>
              <span className="text-white font-semibold text-sm">
                Alive Paris
              </span>
            </div>

            <div className="absolute bottom-10 left-8 right-8">
              <h2 className="text-white text-2xl md:text-3xl font-semibold leading-snug">
                Find your perfect student room near campus.
              </h2>
              <p className="mt-3 text-sm text-gray-200 max-w-xs">
                Modern, furnished rooms with Wi‑Fi, study spaces, and friendly
                student communities.
              </p>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-md px-6 py-10">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-gray-900">Sign in</h1>
              <p className="mt-1 text-sm text-gray-500">
                Log in to manage your bookings, shortlist rooms, and chat with
                landlords.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="student@university.edu"
                  className="mt-1 block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <a href="/forgot-password">
                    <button
                      type="button"
                      className="text-xs font-medium text-gray-500 hover:text-gray-900"
                    >
                      Forgot password?
                    </button>
                  </a>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="mt-1 block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                />
                <label
                  htmlFor="remember"
                  className="text-xs text-gray-600 select-none"
                >
                  <a href="/privacy-policy" className="hover:underline">
                  Agree to privacy policy 
                  </a>
                </label>
              </div>

              {error && (
                <p className="text-xs text-red-600 bg-red-50 p-2 rounded-lg">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 inline-flex justify-center rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-900 transition"
              >
               {loading ? "Signing in..." : "Sign in to find rooms"}
              </button>
            </form>

            <div className="mt-6 flex items-center">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="px-3 text-xs text-gray-400">OR</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <div className="mt-4 w-full">

              <button className="flex items-center justify-center w-full space-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                <FcGoogle />
                <span> Google</span>
              </button>
            </div>

            <p className="mt-6 text-xs text-gray-500 text-center">
              New to CampusRooms?{" "}
              <a href="/signup">
                <button className="font-semibold text-gray-900 hover:underline">
                  Create a free student account
                </button>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
