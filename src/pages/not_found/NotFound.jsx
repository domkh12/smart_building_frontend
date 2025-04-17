import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center flex-col gap-5 h-screen">
      <img
        src="/images/error404.svg"
        alt="error404"
        className="max-w-[600px]"
      />
      <Button
        sx={{ textTransform: "none", borderRadius: "6px", boxShadow: "none" }}
        variant="contained"
        onClick={() => navigate("/dash")}
      >
        Go to home
      </Button>
    </div>
  );
}

export default NotFound;
