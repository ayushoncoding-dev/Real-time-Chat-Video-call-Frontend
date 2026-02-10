import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../config/api.js";

const useLogout = () => {
  const queryClient = useQueryClient();

  const {
    mutate: logoutMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: logout,
    onSuccess: () => queryClient.removeQueries({ queryKey: ["authUser"] }),
  });

  return { logoutMutation, isPending, error };
};
export default useLogout;