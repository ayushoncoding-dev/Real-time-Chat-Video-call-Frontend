import React, { useState } from 'react'
import { ShipWheelIcon} from "lucide-react"
import {Link} from "react-router"
import img1 from "../assets/img1.png"

import { useMutation, useQueryClient} from "@tanstack/react-query"
import { axiosInstance} from "../config/axios.js"
import { signup } from '../config/api.js'



const SignUpPage = () => {

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const { mutate:signupMutation, isPending, error} = useMutation({
    mutationFn: signup,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"]})
    // Invalidate "authUser" so React Query refetches and updates UI with the new logged-in user after signup

  })
  


  const handleSignup = (e)=>{
    e.preventDefault()
     console.log("Sending signup data:", signupData);
    signupMutation(signupData)
  }

  


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black p-4 sm:p-6 md:p-10">
  <div className="flex flex-col lg:flex-row w-full max-w-4xl lg:max-w-[70%] mx-auto rounded-3xl overflow-hidden border border-gray-800 shadow-2xl bg-gradient-to-br from-gray-900 to-gray-950">
    
    {/* Left: Signup Form */}
    <div className="w-full lg:w-1/2 p-5 sm:p-8 flex flex-col justify-center text-gray-100">
      {/* Logo */}
      <div className="mb-6 flex items-center gap-3">
        <ShipWheelIcon className="text-indigo-500 w-6 h-6 drop-shadow-[0_0_6px_rgba(99,102,241,0.7)]" />
        <span className="text-2xl font-extrabold font-mono bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent tracking-wider">
          REAL-TIME-CHAT-CALL
        </span>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-500/20 border border-red-400/40 text-sm rounded-md px-3 py-1.5 mb-3 text-red-200">
          {error.response.data.message}
        </div>
      )}

      <form onSubmit={handleSignup} className="space-y-4">
        {/* Heading */}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-wide">
            Create Account
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Join this webApp and connect through languages.
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-3">
          {/* Full Name */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-3 py-1.5 sm:py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              value={signupData.fullName}
              onChange={(e) =>
                setSignupData({ ...signupData, fullName: e.target.value })
              }
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="john@gmail.com"
              className="w-full px-3 py-1.5 sm:py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              value={signupData.email}
              onChange={(e) =>
                setSignupData({ ...signupData, email: e.target.value })
              }
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••"
              className="w-full px-3 py-1.5 sm:py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              value={signupData.password}
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
              required
            />
            <p className="text-[11px] sm:text-xs text-gray-500 mt-1">
              Password must be at least 6 characters long
            </p>
          </div>

          {/* Terms */}
          <label className="flex items-start gap-2 text-[11px] sm:text-xs text-gray-400">
            <input
              type="checkbox"
              className="checkbox checkbox-xs border-gray-600 checked:bg-indigo-600 mt-0.5"
              required
            />
            <span>
              I agree to the{" "}
              <span className="text-indigo-400 hover:underline">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-indigo-400 hover:underline">
                Privacy Policy
              </span>
              .
            </span>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-3 w-full py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-sm sm:text-base font-medium flex items-center justify-center gap-2 transition-all duration-200 shadow-[0_0_10px_rgba(99,102,241,0.4)] hover:shadow-[0_0_15px_rgba(99,102,241,0.6)]"
        >
          {isPending ? (
            <>
              <span className="loading loading-spinner loading-xs"></span>
              Creating...
            </>
          ) : (
            "Create Account"
          )}
        </button>

        {/* Footer */}
        <p className="text-center text-xs sm:text-sm mt-5 text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>

    {/* Right: Illustration */}
    <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-indigo-950 to-gray-900 items-center justify-center relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1),transparent_70%)]"></div>
      <div className="relative z-10 text-center p-8">
        <img
          src={img1}
          alt="Illustration"
          className="w-80 h-80 object-contain mx-auto drop-shadow-[0_0_25px_rgba(99,102,241,0.4)]"
          
        />
        <h3 className="text-lg sm:text-xl font-semibold text-white mt-5">
          Connect with language partners worldwide
        </h3>
        <p className="text-xs sm:text-sm text-gray-400 mt-1.5">
          Practice conversations, make friends, and improve together.
        </p>
      </div>
    </div>
  </div>
</div>


  )
}

export default SignUpPage