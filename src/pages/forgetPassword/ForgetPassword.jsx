import { useInput } from "../../hooks/useInput";
import Input from "../../ui/Input";
import { useAuthentication } from "../../contexts/AuthContent";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../ui/Container/Container";
import LinkButton from "../../ui/LinkButton";
import HomeLink from "../../ui/HomeLink";
import { useNotification } from "../../hooks/useNotification";

const validateEmail = (value) => value.includes("@") && value.includes(".com");

function ForgetPassword() {
  const { loading, forgetPassword } = useAuthentication();
  const navigate = useNavigate();

  const {
    value: enteredEmail,
    inputIsValid,
    handleInputBlur,
    handleInputChange,
    inputHasError,
  } = useInput(validateEmail);

  let formIsValid = false;
  if (inputIsValid) formIsValid = true;

  const { notify } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await forgetPassword(enteredEmail);

    if (result.status === "fail") {
      notify("error", result.message || "Something went wrong!");
    } else if (result.status === "success") {
      notify("success", result.message || `An email sent to ${enteredEmail}`);
      navigate("/email-gate");
      sessionStorage.setItem("userEmail", enteredEmail);
    }
  };

  return (
    <div className="linear-background bg-fixed h-dvh bg-no-repeat bg-center bg-cover overflow-auto">
      <HomeLink />
      <Container
        background="transparent"
        size="extra-small"
        extraClasses="mt-[10%] px-0 flex items-center justify-center"
      >
        <form
          className="p-16 rounded-lg flex flex-col gap-2 bg-white/15 backdrop-blur-lg"
          onSubmit={handleSubmit}
        >
          <header className="text-stone-100 font-medium text-3xl text-center p-5">
            <h2>Forget Password?</h2>
          </header>
          <div>
            <Input
              value={enteredEmail}
              name="email"
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              placeholder="email"
              type="text"
              hasError={inputHasError}
            />
            {inputHasError && (
              <p className="text-error">Please input a valid email address</p>
            )}
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
            <LinkButton
              disabled={!formIsValid || loading}
              type="submit"
              background="dark"
            >
              {loading ? "Loading..." : "Reset My Password"}
            </LinkButton>
            <Link className="text-white" to={-1}>
              Back To Login
            </Link>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default ForgetPassword;
