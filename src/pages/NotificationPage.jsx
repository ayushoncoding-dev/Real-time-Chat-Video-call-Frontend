import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest, getFriendRequests } from "../config/api.js";
import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon } from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound.jsx";

const NotificationsPage = () => {
  const queryClient = useQueryClient(); 

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];


  return (
  <div className="px-3 sm:px-6 lg:px-8 py-6">
  <div className="container mx-auto max-w-3xl space-y-10">
    {/* Page Title */}
    <h1 className="text-lg sm:text-2xl font-semibold tracking-tight mb-4 text-gray-800 text-center sm:text-left">
      Notifications
    </h1>

    {isLoading ? (
      <div className="flex justify-center py-12">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    ) : (
      <>
        {/* ---------------- FRIEND REQUESTS ---------------- */}
        {incomingRequests.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-medium flex items-center gap-2 text-gray-700">
              <UserCheckIcon className="h-5 w-5 text-primary" />
              Friend Requests
              <span className="ml-2 text-[10px] sm:text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                {incomingRequests.length}
              </span>
            </h2>

            <div className="space-y-3">
              {incomingRequests.map((request) => (
                <div
                  key={request._id}
                  className="card bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all rounded-xl"
                >
                  <div className="card-body p-3 sm:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      {/* Avatar + Info */}
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="avatar w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                          <img
                            src={request.sender.profilePic}
                            alt={request.sender.fullName}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-medium text-gray-800 text-sm sm:text-base truncate">
                            {request.sender.fullName}
                          </h3>
                          <div className="flex flex-wrap gap-1 mt-1 text-xs">
                            <span className="badge badge-secondary badge-sm whitespace-nowrap">
                              Native: {request.sender.nativeLanguage}
                            </span>
                            <span className="badge badge-outline badge-sm whitespace-nowrap">
                              Learning: {request.sender.learningLanguage}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Accept Button */}
                      <button
                        className="btn btn-primary btn-sm px-4 w-full sm:w-auto text-sm rounded-md"
                        onClick={() => acceptRequestMutation(request._id)}
                        disabled={isPending}
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ---------------- ACCEPTED REQUESTS ---------------- */}
        {acceptedRequests.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-medium flex items-center gap-2 text-gray-700">
              <BellIcon className="h-5 w-5 text-success" />
              New Connections
            </h2>

            <div className="space-y-3">
              {acceptedRequests.map((notification) => (
                <div
                  key={notification._id}
                  className="card bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all rounded-xl"
                >
                  <div className="card-body p-3 sm:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                      {/* Avatar */}
                      <div className="avatar w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 mx-auto sm:mx-0">
                        <img
                          src={notification.recipient.profilePic}
                          alt={notification.recipient.fullName}
                          className="object-cover w-full h-full"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 text-sm text-gray-700 text-center sm:text-left">
                        <h3 className="font-medium text-gray-800 text-sm sm:text-base truncate">
                          {notification.recipient.fullName}
                        </h3>
                        <p className="text-xs sm:text-sm mt-1">
                          {notification.recipient.fullName} accepted your friend request
                        </p>
                        <p className="text-xs flex justify-center sm:justify-start items-center mt-1 opacity-60">
                          <ClockIcon className="h-3 w-3 mr-1" />
                          Recently
                        </p>
                      </div>

                      {/* Badge */}
                      <div className="badge badge-success text-xs flex items-center gap-1 px-2 py-1 rounded-md self-center sm:self-auto">
                        <MessageSquareIcon className="h-3 w-3" />
                        New Friend
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ---------------- EMPTY STATE ---------------- */}
        {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
          <NoNotificationsFound />
        )}
      </>
    )}
  </div>
</div>



  );
};
export default NotificationsPage;