import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/UseLogin";
import img2 from "../assets/img2.png"

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // This is how we did it at first, without using our custom hook
  // const queryClient = useQueryClient();
  // const {
  //   mutate: loginMutation,
  //   isPending,
  //   error,
  // } = useMutation({
  //   mutationFn: login,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  // });

  // This is how we did it using our custom hook - optimized version
  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black p-4 sm:p-6 md:p-10">
  <div className="flex flex-col lg:flex-row w-full max-w-4xl lg:max-w-[70%] mx-auto rounded-3xl overflow-hidden border border-gray-800 shadow-2xl bg-gradient-to-br from-gray-900 to-gray-950">

    {/* LEFT SECTION - LOGIN FORM */}
    <div className="w-full lg:w-1/2 p-5 sm:p-8 flex flex-col justify-center text-gray-100">
      {/* Logo */}
      <div className="mb-6 flex items-center gap-3">
        <ShipWheelIcon className="text-indigo-500 w-6 h-6 drop-shadow-[0_0_6px_rgba(99,102,241,0.7)]" />
        <span className="text-2xl font-extrabold font-mono bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent tracking-wider">
           REAL TIME CHAT CALL
        </span>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/20 border border-red-400/40 text-sm rounded-md px-3 py-1.5 mb-3 text-red-200">
          {error.response.data.message}
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleLogin} className="space-y-5">
        {/* Heading */}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-wide">
            Welcome Back
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Sign in to continue your language journey.
          </p>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="hello@example.com"
            className="w-full px-3 py-1.5 sm:py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
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
            placeholder="••••••••"
            className="w-full px-3 py-1.5 sm:py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="mt-3 w-full py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-sm sm:text-base font-medium flex items-center justify-center gap-2 transition-all duration-200 shadow-[0_0_10px_rgba(99,102,241,0.4)] hover:shadow-[0_0_15px_rgba(99,102,241,0.6)]"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <span className="loading loading-spinner loading-xs"></span>
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </button>

        {/* Footer */}
        <p className="text-center text-xs sm:text-sm mt-5 text-gray-400">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-400 hover:underline">
            Create one
          </Link>
        </p>
      </form>
    </div>

    {/* RIGHT SECTION - IMAGE */}
    <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-indigo-950 to-gray-900 items-center justify-center relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1),transparent_70%)]"></div>
      <div className="relative z-10 text-center p-8">
        <img
          src={img2}
          alt="Language connection illustration"
          className="w-80 h-80 object-contain mx-auto drop-shadow-[0_0_25px_rgba(99,102,241,0.4)]"
        />
        <h3 className="text-lg sm:text-xl font-semibold text-white mt-5">
          Connect with learners worldwide
        </h3>
        <p className="text-xs sm:text-sm text-gray-400 mt-1.5">
          Practice, chat, and grow your fluency together.
        </p>
      </div>
    </div>
  </div>
</div>


  );
};
export default LoginPage;