import { useSelector } from "react-redux";
import { selectCurrentToken } from "../redux/feature/auth/authSlice";
import { jwtDecode } from "jwt-decode";

function useAuth() {
  const token = useSelector(selectCurrentToken);
  let isManager = false;
  let isAdmin = false;
  let isUser = false;
  let status = ["Manager"];

  if (token) {
    const decoded = jwtDecode(token);
    const { jti: username, scope, roomId } = decoded;
    const roles = scope ? scope.split(" ") : [];

    isManager = scope.includes("ROLE_MANAGER");
    isAdmin = scope.includes("ROLE_ADMIN");
    isUser = scope.includes("ROLE_USER");

    if (isUser) status = "User";
    if (isAdmin) status = "Admin";
    if (isManager) status = "Manager";

    return { username, roles, status, isManager, isAdmin, isUser, roomId };
  }

  return { username: "", roles: [], isManager, isAdmin, isUser, status };
}

export default useAuth;
