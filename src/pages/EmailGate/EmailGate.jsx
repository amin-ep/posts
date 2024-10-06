import styles from "./EmailGate.module.css";
import { Link } from "react-router-dom";
import { useAuthentication } from "../../contexts/AuthContent";
import { useNotification } from "../../hooks/useNotification";
import LinkButton from "../../ui/LinkButton";

function EmailGate() {
  const { signup, loading, forgetPassword } = useAuthentication();

  const currentEmail = sessionStorage.getItem("authEmail");
  const currentUsername = sessionStorage.getItem("authUsername");
  const currentPassword = sessionStorage.getItem("authPassword");
  const previousPageRoute = sessionStorage.getItem("previousRoute");

  console.log(previousPageRoute);

  const { notify } = useNotification();

  const handleResendButtonClick = async () => {
    if (previousPageRoute.split("/")[1] === "signup") {
      const result = await signup({
        username: currentUsername,
        email: currentEmail,
        password: currentPassword,
      });

      if (result.status === "success") {
        notify("success", result.message);
      } else {
        notify("error", result.message);
      }
    }
    if (previousPageRoute === "/forgetPassword") {
      const result = await forgetPassword(currentEmail);
      if (result.status === "fail") {
        notify("success", result.message);
      } else if (result.status === "success") {
        notify("error", result.message);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center linear-background h-dvh">
        <h5 className="text-stone-100 text-2xl text-center">
          {previousPageRoute === "/signup"
            ? `An Email sent to ${currentEmail}. Please checkout your email account and verify your email!`
            : "This is email message gate"}
          {previousPageRoute === "/forgetPassword" &&
            `An Email sent to ${currentEmail}. Please checkout email`}
        </h5>

        <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] p-4 gap-3">
          <LinkButton
            type="button"
            className="bg-stone-800 rounded-full px-5 py-3 text-white disabled:cursor-not-allowed"
            onClick={handleResendButtonClick}
          >
            {loading ? "Loading..." : "Resend"}
          </LinkButton>
          <Link
            to="https://mail.google.com/mail/u/0/#inbox"
            className={styles["mail-link"]}
            target="_blank"
          >
            Go To Gmail
            <div className={styles["span-wrapper"]}>
              <span className={styles["s1"]}></span>
              <span className={styles["s2"]}></span>
              <span className={styles["s3"]}></span>
              <span className={styles["s4"]}></span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default EmailGate;
