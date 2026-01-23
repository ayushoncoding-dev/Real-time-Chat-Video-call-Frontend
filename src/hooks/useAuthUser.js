import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../config/api.js";
import React from "react";

const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const data = await getAuthUser();
        return data;
      } catch (error) {
        // Only log unexpected errors (ignore 401 Unauthorized)
        if (error.response?.status !== 401) {
          console.error("Error fetching auth user:", error);
        }
        return { success: false, user: null }; // Gracefully return null user
      }
    },
    retry: false,
  });

  return { isLoading: authUser.isLoading, authUser: authUser.data?.user };
};

export default useAuthUser;
