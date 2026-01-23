import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../config/api.js";
import { Link } from "react-router";
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon } from "lucide-react";

import { capitialize } from "../config/utils";


import FriendCard from "../components/FriendCard.jsx";

import NoFriendsFound from "../components/NoFriendFound.jsx";
import { getLanguageFlag } from "../components/FriendCard.jsx";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsersData = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });
  console.log("Recommended Users Data:", recommendedUsersData);
const recommendedUsers = recommendedUsersData || [];



  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
    <div className="min-h-screen bg-base-200 p-4 sm:p-6 lg:p-10">
  <div className="max-w-7xl mx-auto space-y-12">
    {/* ---------------- YOUR FRIENDS SECTION ---------------- */}
    <section>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 text-center sm:text-left md:mt-6">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mx-auto sm:mx-0">
          Your Friends
        </h2>
        <Link
          to="/notifications"
          className="btn btn-outline btn-sm flex items-center gap-2 mx-auto sm:mx-0"
        >
          <UsersIcon className="size-4" />
          Friend Requests
        </Link>
      </div>

      {loadingFriends ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : friends.length === 0 ? (
        <NoFriendsFound />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {friends.map((friend) => (
            <FriendCard key={friend._id} friend={friend} />
          ))}
        </div>
      )}
    </section>

    {/* ---------------- MEET NEW LEARNERS SECTION ---------------- */}
    <section>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Meet New Learners
          </h2>
          <p className="text-sm sm:text-base opacity-70 mt-1">
            Discover perfect language exchange partners based on your profile.
          </p>
        </div>
      </div>

      {loadingUsers ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : recommendedUsers.length === 0 ? (
        <div className="card bg-base-100 p-8 text-center shadow-sm border border-base-300">
          <h3 className="font-semibold text-lg mb-2">
            No recommendations available
          </h3>
          <p className="text-sm opacity-70">
            Check back later for new language partners!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recommendedUsers.map((user) => {
            const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

            return (
              <div
                key={user._id}
                className="card bg-base-100 border border-base-300 hover:shadow-lg hover:border-primary/40 transition-all duration-300"
              >
                <div className="card-body p-6 space-y-4">
                  {/* Avatar + Name */}
                  <div className="flex items-center gap-4">
                    <div className="avatar">
                      <div className="w-16 h-16 rounded-full ring ring-primary/30 ring-offset-base-100 ring-offset-2 overflow-hidden">
                        <img
                          src={user.profilePic}
                          alt={user.fullName}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg leading-tight">
                        {user.fullName}
                      </h3>
                      {user.location && (
                        <div className="flex items-center text-xs opacity-70 mt-1">
                          <MapPinIcon className="size-3 mr-1" />
                          {user.location}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="flex flex-wrap gap-2">
                    <span className="badge badge-secondary whitespace-nowrap">
                      {getLanguageFlag(user.nativeLanguage)}&nbsp;
                      Native: {capitialize(user.nativeLanguage)}
                    </span>
                    <span className="badge badge-outline whitespace-nowrap">
                      {getLanguageFlag(user.learningLanguage)}&nbsp;
                      Learning: {capitialize(user.learningLanguage)}
                    </span>
                  </div>

                  {/* Bio */}
                  {user.bio && (
                    <p className="text-sm opacity-70 leading-snug line-clamp-2">
                      {user.bio}
                    </p>
                  )}

                  {/* Action Button */}
                  <button
                    className={`btn w-full mt-3 ${
                      hasRequestBeenSent ? "btn-disabled" : "btn-primary"
                    }`}
                    onClick={() => sendRequestMutation(user._id)}
                    disabled={hasRequestBeenSent || isPending}
                  >
                    {hasRequestBeenSent ? (
                      <>
                        <CheckCircleIcon className="size-4 mr-2" />
                        Request Sent
                      </>
                    ) : (
                      <>
                        <UserPlusIcon className="size-4 mr-2" />
                        Send Friend Request
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  </div>
</div>

  );
};

export default HomePage;