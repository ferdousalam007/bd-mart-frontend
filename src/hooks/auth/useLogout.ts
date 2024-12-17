import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      toast.success("Logout successful");
      localStorage.removeItem("recentViews");
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      queryClient.setQueryData(["userProfile"], null);
      navigate("/");
    },
  });

  return { logout, isPending };
}
