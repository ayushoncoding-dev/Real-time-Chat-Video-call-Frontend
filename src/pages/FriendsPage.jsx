import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../config/api.js";
import FriendCard from "../components/FriendCard.jsx";
import NoFriendsFound from "../components/NoNotificationsFound.jsx";

const FriendsPage = () => {
  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-center sm:text-left">
      Your Friends
    </h2>
  </div>

  {loadingFriends ? (
    <div className="flex justify-center py-12">
      <span className="loading loading-spinner loading-lg" />
    </div>
  ) : friends.length === 0 ? (
    <NoFriendsFound />
  ) : (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {friends.map((friend) => (
        <FriendCard key={friend._id} friend={friend} />
      ))}
    </div>
  )}
</div>

  );
};

export default FriendsPage;
