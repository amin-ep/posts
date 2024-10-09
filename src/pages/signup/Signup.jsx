import { useState } from "react";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../../utils/validators";
import { useAuthentication } from "../../contexts/AuthContent";
import { useInput } from "../../hooks/useInput";
import Input from "../../ui/Input";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { HiArrowLongRight } from "react-icons/hi2";
import { useNotification } from "../../hooks/useNotification";
import Container from "../../ui/Container/Container";
import styles from "./Signup.module.css";
import LinkButton from "../../ui/LinkButton";
import FileInput from "../../ui/FileInput/FileInput";

function Signup() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { signup, loading } = useAuthentication();

  const navigate = useNavigate();

  const { notify } = useNotification();

  const validateFileType = (fileType) => {
    const type = fileType.split("/")[0];

    if (type !== "image") {
      notify("error", "File should be an image type");
      throw new Error("File should be image");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    validateFileType(e.target.files[0].type);
    setSelectedImage(file);
  };

  const {
    handleInputBlur: handleUsernameBlur,
    handleInputChange: handleUsernameChange,
    inputIsValid: usernameIsValid,
    inputHasError: usernameHasError,
    value: enteredUsername,
  } = useInput(validateUsername);

  const {
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    inputIsValid: emailIsValid,
    inputHasError: emailHasError,
    value: enteredEmail,
  } = useInput(validateEmail);

  const {
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    inputIsValid: passwordIsValid,
    inputHasError: passwordHasError,
    value: enteredPassword,
  } = useInput(validatePassword);

  const validateConfirmPassword = () => {
    let valid = false;
    if (enteredPassword === confirmPassword) valid = true;
    return valid;
  };

  const confirmPasswordIsValid = validateConfirmPassword();

  let formIsValid = false;
  if (
    emailIsValid &&
    usernameIsValid &&
    passwordIsValid &&
    confirmPasswordIsValid &&
    selectedImage
  )
    formIsValid = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();

    payload.append("image", selectedImage);
    payload.append("username", enteredUsername);
    payload.append("email", enteredEmail);
    payload.append("password", enteredPassword);

    const result = await signup(payload);

    if (result.status === "success") {
      navigate(`/verify/${result?.data?.user?.emailVerifyKey}`);
      notify("success", result.message);
    } else if (result.status === "fail") {
      notify("error", result.message);
    }
  };

  return (
    <Container size="small" extraClasses="rounded-lg p-9 flex flex-col gap-10">
      <header className="text-center">
        <h1 className="font-semibold text-5xl text-gray-700">Signup</h1>
      </header>
      <form onSubmit={handleSubmit} className={styles.form}>
        <FileInput
          handleFileChange={handleFileChange}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          imageName="profile"
        />
        <div className={`${styles["username-input-wrapper"]}`}>
          <label className="text-gray-800 font-semibold" htmlFor="username">
            Username
          </label>
          <Input
            onBlur={handleUsernameBlur}
            onChange={handleUsernameChange}
            value={enteredUsername}
            type="text"
            id="username"
            hasError={usernameHasError}
            placeholder="Username"
            name="username"
          />
          {usernameHasError && (
            <p className="text-error">Please input a valid username</p>
          )}
        </div>
        <div className={`${styles["email-input-wrapper"]}`}>
          <label className="text-gray-800 font-semibold" htmlFor="email">
            E-Mail
          </label>
          <Input
            onBlur={handleEmailBlur}
            onChange={handleEmailChange}
            value={enteredEmail}
            type="text"
            id="email"
            hasError={emailHasError}
            placeholder="E-mail"
            name="email"
          />
          {emailHasError && (
            <p className="text-error">Please input a valid email</p>
          )}
        </div>
        <div className={`${styles["password-input-wrapper"]} relative`}>
          <button
            type="button"
            className="absolute top-9 right-5 text-2xl"
            onClick={() => setShowPassword((s) => !s)}
          >
            {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
          </button>
          <label className="text-gray-800 font-semibold" htmlFor="password">
            Password
          </label>
          <Input
            label="password"
            onChange={handlePasswordChange}
            type={!showPassword ? "password" : "text"}
            value={enteredPassword}
            onBlur={handlePasswordBlur}
            id="password"
            hasError={passwordHasError}
            placeholder="Password"
            name="password"
          />
          {passwordHasError && (
            <p className="text-error">
              Please input a valid password(8-12 characters)
            </p>
          )}
        </div>
        <div className={`${styles["confirmPassword-input-wrapper"]} relative`}>
          <label
            className="text-gray-800 font-semibold"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <Input
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            type="password"
            id="confirmPassword"
            hasError={!confirmPasswordIsValid}
            placeholder="Confirm Password"
            name="confirmPassword"
          />
          {!confirmPasswordIsValid && (
            <p className="text-error">Passwords are not same</p>
          )}
        </div>
        <div
          className={`${styles["form-actions"]} grid grid-cols-2 gap-4 items-center`}
        >
          <LinkButton disabled={!formIsValid} type="submit" background="indigo">
            {loading ? "loading" : "Signup"}
          </LinkButton>
          <div className="flex items-center justify-center">
            <Link
              to="/login"
              className="text-gray-700 font-semibold w-min hover:text-indigo-900 transition-all duration-300 flex justify-center items-center"
            >
              Login
              <HiArrowLongRight size={25} />{" "}
            </Link>
          </div>
        </div>
      </form>
    </Container>
  );
}

export default Signup;
