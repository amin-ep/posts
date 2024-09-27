import { useInput } from "../../hooks/useInput";
import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import ResetPasswordInput from "../../features/resetPassword/ResetPasswordInput";
import { useAuthentication } from "../../contexts/AuthContent";
import { useNavigate, useParams } from "react-router-dom";
import AuthLayout from "../../ui/AuthLayout";
import HomeLink from "../../ui/HomeLink";
import { useNotification } from "../../hooks/useNotification";
import { ToastContainer } from "react-toastify";

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
    } else if (result.status === "fail") {
      notify("error", result.message);
      console.log(result);
    }
  };

  return (
    <div
      className="bg-fixed bg-no-repeat bg-center bg-cover"
      style={{
        backgroundImage: `url(${"/public/images/laptop-background.jpg"})`,
      }}
    >
      <AuthLayout background="secondary">
        <HomeLink />
        <ToastContainer limit={3} />
        <form
          className="p-10 w-[25rem] rounded-lg shadow-2xl bg-white/40 backdrop-blur-sm shadow-stone-900 flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <header className="text-center w-full text-4xl px-6 py-9">
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
            <label htmlFor="password">password</label>
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
            <label htmlFor="confirmPassword">Confirm Password</label>
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
            <button
              className="bg-stone-800 w-full rounded-full px-5 py-3 text-white disabled:cursor-not-allowed"
              type="submit"
              disabled={!formIsValid}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </AuthLayout>
    </div>
  );
}

export default ResetPassword;
