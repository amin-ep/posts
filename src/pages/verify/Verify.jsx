import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthentication } from "../../contexts/AuthContent";
import styles from "./Verify.module.css";
import VerifyTimer from "../../features/verify/VerifyTimer";
import { GoVerified } from "react-icons/go";

function Verify() {
  const [timer, setTimer] = useState(5);
  const { verifyAccount, loading, error } = useAuthentication();

  const navigate = useNavigate();
  const { key } = useParams();

  useEffect(() => {
    verifyAccount(key);
    console.log(key);
  }, []);

  useEffect(() => {
    if (!loading && !error) {
      const interval = setInterval(function () {
        if (timer === 0) navigate("/home");
        setTimer((t) => t - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [navigate, timer, loading, error]);

  return (
    <div className={styles.verify}>
      <div className="flex items-center justify-center flex-col h-full bg-black/65 overflow-auto text-white">
        {error === false ? (
          <>
            <header className="flex items-center text-center flex-col justify-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase">
                Your account verified successfully
              </h1>
              <span className="text-6xl sm:text-7xl md:text-8xl lg:text-[150px] my-10">
                <GoVerified />
              </span>
            </header>
            <main>
              <VerifyTimer time={timer} />
            </main>
            <footer className="mt-24 text-center">
              <p className="text-xl">
                &copy;This is a dummy text for testing the app
              </p>
            </footer>
          </>
        ) : (
          <>
            <div className="flex flex-col text-center items-center gap-5">
              <p className="text-4xl">
                There was an error while verifying your email. <br />
                Please signup again!
              </p>
              <button
                className="bg-white rounded-full px-5 py-3 text-stone-900 disabled:cursor-not-allowed"
                onClick={() => navigate("/signup")}
              >
                Signup
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Verify;
