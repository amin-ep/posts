import { useInput } from "../../hooks/useInput";
import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import ResetPasswordInput from "../../features/resetPassword/ResetPasswordInput";
import { useAuthentication } from "../../contexts/AuthContent";
import { useNavigate, useParams } from "react-router-dom";
import HomeLink from "../../ui/HomeLink";
import { useNotification } from "../../hooks/useNotification";
import Container from "../../ui/Container/Container";
import LinkButton from "../../ui/LinkButton";

const validatePassword = (value) =>
  value.trim().length <= 12 && value.trim().length >= 8;

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading, recoverPassword } = useAuthentication();

  const { key } = useParams();

  const navigate = useNavigate();

  const {
    value: enteredPassword,
    handleInputBlur: handlePasswordBlur,
    inputHasError: passwordHasError,
    handleInputChange: handlePasswordChange,
    reset: resetPassword,
    inputIsValid: passwordIsValid,
  } = useInput(validatePassword);

  const { notify } = useNotification();

  let formIsValid = false;
  if (passwordIsValid) formIsValid = true;

  const validateConfirmPassword = () => {
    let valid = false;
    if (enteredPassword === confirmPassword) valid = true;
    return valid;
  };

  const confirmPasswordIsValid = validateConfirmPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await recoverPassword(enteredPassword, key);
    if (result.status === "success") {
      resetPassword();
      setConfirmPassword("");
      navigate("/login");
      notify("success", "Password changed successfully");
    } else if (result.status === "fail") {
      notify("error", result.message || "Something went wrong!");
    }
  };

  return (
    <div className="bg-fixed bg-no-repeat bg-center bg-cover">
      <HomeLink color="indigo" />
      <Container size="smallest" extraClasses="rounded-md mt-24">
        <form
          className="p-10 w-full flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <header className="text-center text-gray-800 w-full text-3xl px-6 py-9 flex flex-col items-center gap-10 font-semibold">
            <img
              src="/public/images/logo-dark.svg"
              alt="Logo"
              className="w-44 h-16 object-cover"
            />
            <h1>Reset Password</h1>
          </header>

          <div className="relative">
            <button
              type="button"
              className="absolute top-11 right-[75px] text-2xl"
              onClick={() => setShowPassword((s) => !s)}
            >
              {showPassword ? <HiOutlineEye /> : <HiOutlineEyeSlash />}
            </button>
            <label className="text-gray-800 font-semibold" htmlFor="password">
              Password
            </label>
            <ResetPasswordInput
              label="password"
              onChange={handlePasswordChange}
              type={!showPassword ? "password" : "text"}
              value={enteredPassword}
              onBlur={handlePasswordBlur}
              id="password"
              hasError={passwordHasError}
              placeholder="Password"
            />
            {passwordHasError && (
              <p className="text-error">
                Please input a valid password(8-12 characters)
              </p>
            )}
          </div>
          <div className="relative">
            <label
              className="text-gray-800 font-semibold"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <ResetPasswordInput
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              type="password"
              id="confirmPassword"
              hasError={!confirmPasswordIsValid}
              name="confirmPassword"
              placeholder="Confirm Password"
            />
            {!confirmPasswordIsValid && (
              <p className="text-error">Passwords are not same</p>
            )}
          </div>
          <div className="my-4">
            <LinkButton
              type="submit"
              disabled={!formIsValid}
              background="indigo"
            >
              {loading ? "Loading..." : "Submit"}
            </LinkButton>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default ResetPassword;
