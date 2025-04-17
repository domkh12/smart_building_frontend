import { useEffect, useRef, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { selectCurrentToken } from "../../redux/feature/auth/authSlice";
import { useRefreshMutation } from "../../redux/feature/auth/authApiSlice";
import { Outlet } from "react-router-dom";
import usePersist from "../../hook/usePersist";
import Error401Component from './../../components/Error401Component';
import {selectIsInitialLoading, setInitialLoading} from "../../redux/feature/app/appSlice.js";
import WaveLoadingComponent from "../../components/WaveLoadingComponent.jsx";

function PersistLogin() {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const [trueSuccess, setTrueSuccess] = useState(false);
  const effectRan = useRef(false);

  const [refresh, { isUninitialized, isSuccess, isLoading, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      const verifyRefreshToken = async () => {
        try {
          await refresh();
          setTrueSuccess(true);
        } catch (error) {
          console.log(error);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }

    return () => (effectRan.current = true);
  }, []);

  let content;
  if (!persist) {
    // persist: no
    content = <Outlet />;
  } else if (isLoading) {
    // persist: yes , token: no
    content = <WaveLoadingComponent />;
  } else if (isError) {
    localStorage.removeItem("isRemember")
    content = <Error401Component/>
  } else if (isSuccess && trueSuccess) {
    // persist: yes , token: yes
    content = <Outlet />;
  } else if (token && isUninitialized) {
    content = <Outlet />;
  }

  return content;
}

export default PersistLogin;
