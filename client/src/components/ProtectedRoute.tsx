import { useQuery } from "@tanstack/react-query";
import { authMe } from "../utils/apiCalls";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const {
    // data: auth,
    isError,
  } = useQuery({
    queryKey: ["auth"],
    queryFn: authMe,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  if (isError) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
}

export default ProtectedRoute;
