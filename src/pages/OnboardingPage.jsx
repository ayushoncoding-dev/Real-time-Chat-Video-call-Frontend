
import React, {useState} from 'react'
import useAuthUser from '../hooks/useAuthUser.js'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { completeOnboarding } from '../config/api.js'
import { LoaderIcon, MapPinIcon, ShipWheelIcon, ShuffleIcon, CameraIcon } from "lucide-react";
import { LANGUAGES } from "../constants/index.js";
import toast from "react-hot-toast"; 


const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1; // 1-100 included
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
  };

  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black p-4 sm:p-6 md:p-8">
  <div className="w-full flex justify-center">
    <div className="w-full max-w-3xl lg:max-w-[65%] scale-95 lg:scale-80 bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-3xl shadow-2xl p-5 sm:p-6 md:p-8 text-gray-100 overflow-hidden">

      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent tracking-wide">
        Complete Your Profile
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        {/* Profile Picture */}
        <div className="flex flex-col items-center space-y-3">
          <div className="size-28 rounded-full overflow-hidden bg-gray-800 border border-gray-700 shadow-inner">
            {formState.profilePic ? (
              <img
                src={formState.profilePic}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <CameraIcon className="size-10 text-gray-500" />
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleRandomAvatar}
            className="px-3 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 flex items-center gap-2 text-xs sm:text-sm font-medium transition-all duration-200 shadow-[0_0_10px_rgba(99,102,241,0.4)] hover:shadow-[0_0_15px_rgba(99,102,241,0.6)]"
          >
            <ShuffleIcon className="size-4" />
            Generate Random Avatar
          </button>
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formState.fullName}
            onChange={(e) =>
              setFormState({ ...formState, fullName: e.target.value })
            }
            placeholder="Your full name"
            className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">
            Bio
          </label>
          <textarea
            name="bio"
            value={formState.bio}
            onChange={(e) =>
              setFormState({ ...formState, bio: e.target.value })
            }
            placeholder="Tell others about yourself"
            className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-20 resize-none text-sm"
          />
        </div>

        {/* Languages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              Native Language
            </label>
            <select
              name="nativeLanguage"
              value={formState.nativeLanguage}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  nativeLanguage: e.target.value,
                })
              }
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            >
              <option value="">Select your native language</option>
              {LANGUAGES.map((lang) => (
                <option key={`native-${lang}`} value={lang.toLowerCase()}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              Learning Language
            </label>
            <select
              name="learningLanguage"
              value={formState.learningLanguage}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  learningLanguage: e.target.value,
                })
              }
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            >
              <option value="">Select language you're learning</option>
              {LANGUAGES.map((lang) => (
                <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">
            Location
          </label>
          <div className="relative">
            <MapPinIcon className="absolute top-[65%] left-3 -translate-y-1/2 size-4 text-gray-500" />

            <input
              type="text"
              name="location"
              value={formState.location}
              onChange={(e) =>
                setFormState({ ...formState, location: e.target.value })
              }
              placeholder="City, Country"
              className="w-full pl-9 px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          className="mt-2 w-full py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 shadow-[0_0_10px_rgba(99,102,241,0.4)] hover:shadow-[0_0_15px_rgba(99,102,241,0.6)]"
          disabled={isPending}
          type="submit"
        >
          {!isPending ? (
            <>
              <ShipWheelIcon className="size-5" />
              Complete Onboarding
            </>
          ) : (
            <>
              <LoaderIcon className="animate-spin size-5" />
              Onboarding...
            </>
          )}
        </button>
      </form>
    </div>
  </div>
</div>


  );
};

export default OnboardingPage