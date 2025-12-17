import React, { useState } from "react";
import BacktoHome from "../../../components/btns/BacktoHome";
import { FcGoogle } from "react-icons/fc";
import { useSignin } from "../../../hooks/auth/useSignin";

const SignIn = () => {
  const { signin, loading, error } = useSignin();

  const [form, setForm] = useState({
    email: "",
    password: "",
    privacy_policy: false,
  });

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

            <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 space-y-4"
      >
        <h1 className="text-xl font-semibold">Sign in</h1>

        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2 rounded"
        />

        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border p-2 rounded"
        />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="privacy_policy"
            checked={form.privacy_policy}
            onChange={handleChange}
          />
          Agree to privacy policy
        </label>

        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border py-2 rounded"
        >
          <FcGoogle />
          Google
        </button>
      </form>

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
