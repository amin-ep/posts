import { useAuthentication } from "../../contexts/AuthContent";
import { useNotification } from "../../hooks/useNotification";
import LinkButton from "../../ui/LinkButton";
import Container from "../../ui/Container/Container";

function EmailGate() {
  const { loading, forgetPassword } = useAuthentication();
  const { notify } = useNotification();

  const userEmail = sessionStorage.getItem("userEmail");

  const handleResendButtonClick = async () => {
    const result = await forgetPassword(userEmail);

    if (result.status === "fail") {
      notify("error", result.message || "Something went wrong!");
    } else if (result.status === "success") {
      notify("success", result.message);
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
          An email sent to {userEmail} checkout your email and reset your
          password.
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
