// SignUp.jsx
import React from "react";
import BacktoHome from "../../../components/btns/BacktoHome";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const SignUp = () => {
  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center">
        <div className="absolute top-0 right-5">
                    <BacktoHome/>
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
                Create your free student housing account.
              </h2>
              <p className="mt-3 text-sm text-gray-200 max-w-xs">
                Save your favourite rooms, compare prices, and book your next
                home near campus in a few clicks.
              </p>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-md px-6 py-10">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-gray-900">Sign up</h1>
              <p className="mt-1 text-sm text-gray-500">
                Join CampusRooms to discover verified student rooms and secure
                your stay before the semester starts.
              </p>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="Alex"
                    className="mt-1 block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Sharma"
                    className="mt-1 block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>

              {/* <div className="flex gap-5">
                <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  University email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="student@university.edu"
                  className="mt-1 block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label
                  htmlFor="university"
                  className="block text-sm font-medium text-gray-700"
                >
                  University / College
                </label>
                <input
                  id="university"
                  type="text"
                  placeholder="Enter your institution"
                  className="mt-1 block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
                />
              </div>
                </div>   */}

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  className="mt-1 block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  className="mt-1 block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="flex items-start space-x-2">
                <input
                  id="terms"
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                />
                <label
                  htmlFor="terms"
                  className="text-xs text-gray-600 select-none"
                >
                  I agree to the Terms of Service and Privacy Policy for booking
                  student rooms.
                </label>
              </div>

              <button
                type="submit"
                className="w-full mt-2 inline-flex justify-center rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-900 transition"
              >
                Create account
              </button>
            </form>

            <div className="mt-6 flex items-center">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="px-3 text-xs text-gray-400">OR</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <div className="mt-4  w-full">
             
              <button className="flex items-center justify-center w-full space-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                <FcGoogle/>
                <span> Google</span>
              </button>
            </div>

            <p className="mt-6 text-xs text-gray-500 text-center">
              Already have an account?{" "}
               <a href="/signin">
              <button className="font-semibold text-gray-900 hover:underline">
                Sign in
              </button>
               </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
