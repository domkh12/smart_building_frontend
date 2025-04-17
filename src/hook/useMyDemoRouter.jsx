import { useLocation, useNavigate } from "react-router-dom";

export default function useMyDemoRouter({basePath}) {
  const navigate = useNavigate();
  const location = useLocation();

  return {
    currentPath: location.pathname,
    navigate: (path) => navigate(`${basePath}${path}`), // Define `navigate`
  };
}
