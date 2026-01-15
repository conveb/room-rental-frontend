import React, { useState, useEffect } from "react";
import BacktoHome from "../../../components/btns/BacktoHome";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useSignin } from "../../../hooks/auth/useSignin";
import { useGoogleAuth } from "../../../hooks/auth/useGoogleAuth"; // Your hook
import { Link } from "react-router-dom";

const SignIn = () => {
  // Manual Signin Hook
  const { signin, loading: manualLoading, error: manualError } = useSignin();
  // Google Signin Hook
  const { googleLogin, loading: googleLoading, error: googleError } = useGoogleAuth();

  const [form, setForm] = useState({email: "",password: "",});
  const [showPassword, setShowPassword] = useState(false);
  const [codeClient, setCodeClient] = useState(null);
  useEffect(() => {
    /* global google */
   if (window.google) {
      const client = google.accounts.oauth2.initCodeClient({
        client_id: "484008610238-ptd10rj6tjd5gqnsh5st5np6ggkiuns1.apps.googleusercontent.com",
        scope: "openid email profile",
        ux_mode: "popup",
        redirect_uri: "postmessage",
       callback: (response) => {
          if (response.code) {
            googleLogin(response.code);
          }
        },
      });
      setCodeClient(client);
    }
  }, [googleLogin]);



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleGoogleClick = () => {
    if (codeClient) codeClient.requestCode();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signin(form);
  };

  // Combined loading state for buttons
  const isProcessing = manualLoading || googleLoading;

  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center px-4">
      <div className="absolute top-4 right-5">
        <BacktoHome />
      </div>

      <div className="w-full max-w-5xl mx-auto flex overflow-hidden">
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
              <div className="h-8 w-8 rounded-xl bg-white flex items-center justify-center">🏠</div>
              <span className="text-white font-semibold text-sm">Alive Paris</span>
            </div>
            <div>
              <h2 className="text-white text-3xl font-semibold leading-snug">
                Find your perfect student room near campus.
              </h2>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-md px-6 py-10">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-gray-900">Sign in</h1>
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              <div className="flex justify-end">
                <Link to='/forgot-password' theme="text-sm text-black hover:underline">
                  Forgot Password?
                </Link>
              </div>

              {/* ERROR DISPLAY */}
              {(manualError || googleError) && (
                <p className="text-red-600 text-sm">{manualError || googleError}</p>
              )}

              {/* MANUAL SUBMIT */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-900 transition disabled:opacity-60"
              >
                {manualLoading ? "Signing in..." : "Sign in"}
              </button>

              {/* DIVIDER */}
              <div className="flex items-center my-4">
                <div className="flex-grow h-px bg-gray-300" />
                <span className="mx-3 text-xs font-semibold text-gray-500">OR</span>
                <div className="flex-grow h-px bg-gray-300" />
              </div>

              {/* GOOGLE LOGIN BUTTON */}
              <button
                type="button"
                onClick={handleGoogleClick}
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-3 border py-2.5 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
              >
                {googleLoading ? (
                  <span className="text-sm">Exchanging Code...</span>
                ) : (
                  <>
                    <FcGoogle size={20} />
                    <span className="font-medium text-gray-700">Continue with Google</span>
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-xs text-gray-500 text-center">
              New to CampusRooms?{" "}
              <Link to="/signup" className="font-semibold text-gray-900 hover:underline">
                Create a free student account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;