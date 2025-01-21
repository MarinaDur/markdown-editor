import FontAwesomeIcons from "../ui/FoneAwsomeIcons";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../utils/apiCalls";

function Logout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      navigate("/");
    },
    // onError: (error) => {
    //   if (axios.isAxiosError(error)) {
    //     // handleError(error.response?.data?.message);
    //   } else {
    //     // setIsLoggedIn(false);

    //     // handleError("An unexpected error occurred");
    //     console.error("An unexpected error occurred:", error);
    //   }
    // },
  });

  function handleLogout() {
    logoutMutation.mutate();
  }

  return (
    <>
      <FontAwesomeIcons handleLogout={handleLogout} />
    </>
  );
}

export default Logout;
