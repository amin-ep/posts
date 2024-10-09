import { useAuthentication } from "../../contexts/AuthContent";
import { useNotification } from "../../hooks/useNotification";
import LinkButton from "../../ui/LinkButton";
import Container from "../../ui/Container/Container";

function EmailGate() {
  const { signup, loading, forgetPassword } = useAuthentication();

  const currentEmail = sessionStorage.getItem("authEmail");
  const currentUsername = sessionStorage.getItem("authUsername");
  const currentPassword = sessionStorage.getItem("authPassword");
  const previousPageRoute = sessionStorage.getItem("previousRoute");

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
    <div className="flex flex-col items-center justify-center bg-white h-dvh">
      <Container
        size="extra-small"
        extraClasses="flex flex-col items-center"
        background="white"
      >
        <h5 className="text-gray-900 text-lg text-center">
          {previousPageRoute === "/signup"
            ? `An Email sent to ${currentEmail}. Please checkout your email account and verify your email!`
            : "This is email message gate"}
          {previousPageRoute === "/forgetPassword" &&
            `An Email sent to ${currentEmail}. Please checkout email`}
        </h5>

        <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] p-4 gap-3">
          <LinkButton
            type="button"
            background="indigo"
            onClick={handleResendButtonClick}
          >
            {loading ? "Loading..." : "Resend"}
          </LinkButton>
        </div>
      </Container>
    </div>
  );
}

export default EmailGate;
