import ChangePasswordInput from "../../features/changePassword/ChangePasswordInput";
import { useInput } from "../../hooks/useInput";
import { useAuthentication } from "../../contexts/AuthContent";
import { useNavigate } from "react-router-dom";
import Container from "../../ui/Container/Container";
import HomeLink from "../../ui/HomeLink";
import LinkButton from "../../ui/LinkButton";
import { useNotification } from "../../hooks/useNotification";

const validatePassword = (value) =>
  value.trim().length <= 12 && value.trim().length >= 8;

function ChangePassword() {
  const { loading, updateMyPassword } = useAuthentication();
  const navigate = useNavigate();

  const {
    value: enteredCurrentPassword,
    handleInputBlur: handleCurrentPasswordBlur,
    handleInputChange: handleCurrentPasswordChange,
    reset: currentPasswordReset,
    inputHasError: currentPasswordHasError,
    inputIsValid: currentPasswordIsValid,
  } = useInput(validatePassword);

  const {
    value: enteredPassword,
    handleInputBlur: handlePasswordBlur,
    handleInputChange: handlePasswordChange,
    reset: passwordReset,
    inputHasError: passwordHasError,
    inputIsValid: passwordIsValid,
  } = useInput(validatePassword);

  let formIsValid = false;
  if (currentPasswordIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const { notify } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateMyPassword({
      currentPassword: enteredCurrentPassword,
      password: enteredPassword,
    });
    if (result.status === "fail") {
      notify("error", result.message);
    } else if (result.status === 200) {
      notify(
        "success",
        `Password changed successfully! The new Password is ${enteredPassword}.`
      );

      currentPasswordReset();
      passwordReset();
    }
  };

  return (
    <div className="linear-background h-dvh bg-fixed bg-cover overflow-auto flex justify-center items-center">
      <Container background="transparent" extraClasses="mt-0" size="smallest">
        <HomeLink />
        <form
          onSubmit={handleSubmit}
          className="bg-white/15 backdrop-blur-md w-full max-w-[95%] shadow-2xl shadow-[rgba(0,0,0,0.35)] rounded-lg z-40"
        >
          <header className="text-2xl sm:text-3xl text-center pt-8 pb-2 text-white">
            <h1>Change Password</h1>
          </header>
          <div className="grid grid-cols-1 py-8 gap-4 px-8">
            <div className="flex flex-col w-full">
              <label
                className="text-white font-semibold text-lg"
                htmlFor="currentPassword"
              >
                Current Password
              </label>
              <ChangePasswordInput
                id="currentPassword"
                name="currentPassword"
                type="password"
                onBlur={handleCurrentPasswordBlur}
                onChange={handleCurrentPasswordChange}
                placeholder="Current Password"
                value={enteredCurrentPassword}
                hasError={currentPasswordHasError}
              />
              {currentPasswordHasError && (
                <p className="text-error">
                  Please input your password correctly (8-12 characters)
                </p>
              )}
            </div>
            <div className="flex flex-col w-full">
              <label
                className="text-white font-semibold text-lg"
                htmlFor="password"
              >
                Password
              </label>
              <ChangePasswordInput
                id="password"
                name="password"
                type="password"
                onBlur={handlePasswordBlur}
                onChange={handlePasswordChange}
                placeholder="Current Password"
                value={enteredPassword}
                hasError={passwordHasError}
              />
              {passwordHasError && (
                <p className="text-error">
                  Please input a valid password (8-12 characters)
                </p>
              )}
            </div>
            <div className="grid grid-cols-[60%_auto] gap-4">
              <LinkButton type="submit" disabled={!formIsValid}>
                {loading ? "Loading..." : "Edit"}
              </LinkButton>

              <LinkButton
                type="button"
                onClick={() => {
                  navigate(-1);
                }}
                background="white"
              >
                Cancel
              </LinkButton>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default ChangePassword;
