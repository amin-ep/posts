import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useTimer(seconds, startTimer, navigatePath) {
  const [timer, setTimer] = useState(seconds);
  const navigate = useNavigate();
  const { pathname: previousRoute } = useLocation();

  useEffect(() => {
    if (startTimer === true) {
      const interval = setInterval(function () {
        if (timer === 0) {
          navigate(navigatePath);
          sessionStorage.setItem("previousRoute", previousRoute);
        }
        setTimer((t) => t - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTimer, navigate, timer, navigatePath, previousRoute]);

  return { timer };
}
