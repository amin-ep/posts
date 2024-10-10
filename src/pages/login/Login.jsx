import { HiOutlineUser } from "react-icons/hi2";
import Input from "../../ui/Input";
import { useAuthentication } from "../../contexts/AuthContent";
import { useInput } from "../../hooks/useInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/validators";
import { validatePassword } from "../../utils/validators";
import { useNotification } from "../../hooks/useNotification";
import HomeLink from "../../ui/HomeLink";
import EyeButton from "../../ui/EyeButton";
import { useState, useCallback } from "react";
import Container from "../../ui/Container/Container";
import LinkButton from "../../ui/LinkButton";

function Login() {
  const { login, loading } = useAuthentication();
  const { notify } = useNotification();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const {
    value: enteredEmail,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    inputIsValid: emailIsValid,
    inputHasError: emailHasError,
  } = useInput(validateEmail);

  const {
    value: enteredPassword,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    inputIsValid: passwordIsValid,
    inputHasError: passwordHasError,
  } = useInput(validatePassword);

  let formIsValid = false;
  if (emailIsValid && passwordIsValid) formIsValid = true;

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const result = await login({
        email: enteredEmail,
        password: enteredPassword,
      });

      if (result.status === "fail") {
        notify("error", result.message);
      } else {
        navigate(-1);
        notify("success", `Welcome to your account ${result.data.username}`);
      }
    },
    [enteredEmail, enteredPassword, login, navigate]
  );

  return (
    <>
      <div className="linear-background h-dvh bg-fixed overflow-auto">
        <Container
          size="extra-small"
          extraClasses="mt-0 flex items-center justify-center"
          background="transparent"
        >
          <HomeLink />
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 mt-[25%]"
          >
            <header className="flex items-center justify-center flex-col text-white">
              <HiOutlineUser
                size={100}
                className="border-2 border-white rounded-full p-4"
              />
              <h1 className="text-3xl font-semibold">Login</h1>
            </header>

            <Input
              id="email"
              placeholder="E-Mail"
              onBlur={handleEmailBlur}
              onChange={handleEmailChange}
              value={enteredEmail}
              type="text"
              hasError={emailHasError}
            />
            <div className="relative">
              <EyeButton
                isShown={showPassword}
                onClick={() => setShowPassword((show) => !show)}
                extraStyles="top-[11px] right-4"
              />
              <Input
                id="password"
                placeholder="Password"
                onBlur={handlePasswordBlur}
                onChange={handlePasswordChange}
                value={enteredPassword}
                type={showPassword ? "text" : "password"}
                hasError={passwordHasError}
              />
            </div>

            <div className="flex">
              <LinkButton
                disabled={!formIsValid}
                className="bg-stone-800 w-full rounded-full px-5 py-3 text-white disabled:cursor-not-allowed"
              >
                {loading ? "Loading..." : "Login"}
              </LinkButton>
            </div>
            <div className="flex flex-col justify-center items-center text-white mt-4">
              <Link to="/forgetPassword">Forget Password?</Link>
              <Link to="/signup">Do not have account?</Link>
            </div>
          </form>
        </Container>
      </div>
    </>
  );
}

export default Login;
