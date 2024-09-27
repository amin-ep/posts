/* eslint-disable react/prop-types */
import ProfileInput from "./AccountInput";
import { useAuthentication } from "../../contexts/AuthContent";
import { useInput } from "../../hooks/useInput";
import { Link } from "react-router-dom";
import { useNotification } from "../../hooks/useNotification";
import LinkButton from "../../ui/LinkButton";
import { ToastContainer } from "react-toastify";

const validateUsername = (value) =>
  value.trim().length <= 12 && value.trim().length >= 5;

const validateEmail = (value) => value.includes("@") && value.includes(".com");
function AccountForm({ selectedImage }) {
  const { currentUserData, loading, updateMe } = useAuthentication();

  const {
    handleInputBlur: handleUsernameBlur,
    handleInputChange: handleUsernameChange,
    inputIsValid: usernameIsValid,
    inputHasError: usernameHasError,
    value: enteredUsername,
    reset: resetUsername,
  } = useInput(validateUsername);

  const {
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    inputIsValid: emailIsValid,
    inputHasError: emailHasError,
    value: enteredEmail,
    reset: resetEmail,
  } = useInput(validateEmail);

  const { notify } = useNotification();

  let formIsValid = false;
  if (emailIsValid || usernameIsValid) formIsValid = true;
  if (
    currentUserData?.username === enteredUsername ||
    currentUserData?.email === enteredEmail
  )
    formIsValid = false;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();

    if (enteredUsername) payload.append("username", enteredUsername);
    if (enteredEmail) payload.append("email", enteredEmail);
    if (selectedImage !== "") payload.append("image", selectedImage);

    const result = await updateMe(payload);

    if (result.status === "success") {
      notify("success", "Your account updated successfully");
      resetUsername();
      resetEmail();
    } else {
      notify("error", result.message);
    }
  };

  return (
    <>
      <ToastContainer limit={3} />
      <form
        onSubmit={handleSubmit}
        className="flex justify-center gap-5 items-center flex-col"
      >
        <ProfileInput
          id="username"
          name="username"
          labelValue={currentUserData.username}
          value={enteredUsername}
          onBlur={handleUsernameBlur}
          onChange={handleUsernameChange}
          placeholder="Username"
          hasError={usernameHasError}
          label="Username"
          defaultValue={currentUserData?.username}
        />
        <ProfileInput
          id="email"
          name="email"
          placeholder="E-Mail"
          labelValue={currentUserData.email}
          value={enteredEmail}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          hasError={emailHasError}
          label="Email"
          defaultValue={currentUserData?.email}
        />
        <div className="flex flex-col sm:flex-row sm:gap-8 sm:px-10 w-40 justify-center items-center">
          <LinkButton disabled={!formIsValid} type="submit" background="dark">
            {loading ? "Loading..." : "Edit"}
          </LinkButton>
        </div>
        <Link to="/change-password" className="hover:text-white">
          Change My Password
        </Link>
      </form>
    </>
  );
}

export default AccountForm;
