import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import { useEffect } from "react";
import { useRefreshMutation } from "../../redux/feature/auth/authApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../redux/feature/auth/authSlice";

function OAuth2RedirectHandler() {
  const location = useLocation();
  const { username, roles } = useAuth();
  const token = useSelector(selectCurrentToken);
  const navigator = useNavigate();
  const [refresh, { isUninitialized, isSuccess, isLoading, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    console.log("oauth_load");

    const verifyRefreshToken = async () => {
      console.log("verifying refresh token");
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      }
    };

    if (!token) verifyRefreshToken();
  }, []);

  useEffect(() => {
    navigator("/dash");
  }, [isSuccess]);
}

export default OAuth2RedirectHandler;
