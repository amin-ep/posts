import AuthLayout from "../../ui/AuthLayout";
import { useState } from "react";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../../utils/validators";
import { useAuthentication } from "../../contexts/AuthContent";
import { useInput } from "../../hooks/useInput";
import FileInput from "../../ui/FileInput";
import Input from "../../ui/Input";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { HiArrowLongRight } from "react-icons/hi2";
import { ToastContainer } from "react-toastify";
import { useNotification } from "../../hooks/useNotification";
import styled, { css } from "styled-components";
import HomeLink from "../../ui/HomeLink";

function Signup() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { signup, loading } = useAuthentication();
  const navigate = useNavigate();

  const validateFileType = (fileType) => {
    const type = fileType.split("/")[0];

    if (type !== "image") {
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

  const { notify } = useNotification();

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
    console.log(result);

    if (result.status === "success") {
      sessionStorage.setItem("authUsername", enteredUsername);
      sessionStorage.setItem("authEmail", enteredEmail);
      sessionStorage.setItem("authPassword", enteredPassword);
      navigate("/");
    } else if (result.status === "fail") {
      notify("error", result.message);
    }
  };

  const SquareBasicStyles = css`
    box-shadow: 0 7px 5px rgba(0, 0, 0, 0.219);
    position: absolute;
    border-radius: 7px;

    z-index: -10;
  `;

  const Square1 = styled.div`
    width: 100px;
    height: 100px;
    top: -5%;
    left: -5%;
    ${SquareBasicStyles}
    background-color: #ffffff99;
    z-index: 60;
  `;

  const Square2 = styled.div`
    ${SquareBasicStyles}
    width: 185px;
    height: 185px;
    right: -15%;
    top: -7%;
    background-color: #ffffffa4;
    z-index: 60;
  `;

  const Square3 = styled.div`
    ${SquareBasicStyles}
    width: 95px;
    height: 95px;
    right: -7%;
    top: 45%;
    background-color: #ffffff29;
    z-index: -10;
  `;

  const Square4 = styled.div`
    ${SquareBasicStyles}
    width: 140px;
    height: 140px;
    right: -7%;
    bottom: -5%;
    background-color: #ffffff40;
    z-index: -10;
  `;

  const Square5 = styled.div`
    ${SquareBasicStyles}
    background-color: #ffffff47;
    width: 260px;
    height: 260px;
    bottom: -5%;
    left: -10%;
    z-index: -10;
  `;

  return (
    <>
      <ToastContainer limit={3} />
      <AuthLayout>
        <HomeLink />
        <div className="bg-white/45 backdrop-blur-3xl z-50 rounded-3xl py-5 relative shadow-xl w-[60rem] max-w-full shadow-black/60">
          <Square1 />
          <Square2 />
          <Square3 />
          <Square4 />
          <Square5 />
          <header className="text-center flex flex-col py-10">
            <h1 className="font-semibold text-5xl">Signup</h1>
          </header>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-[25rem_auto] gap-3 p-5"
          >
            <FileInput
              selectedImage={selectedImage}
              handleFileChange={handleFileChange}
              setSelectedImage={setSelectedImage}
            />
            <div>
              <div className="relative w-full">
                <label htmlFor="username">username</label>
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
              <div className="relative w-full">
                <label htmlFor="email">email</label>
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
              <div className="relative w-full">
                <button
                  type="button"
                  className="absolute top-9 right-5 text-2xl"
                  onClick={() => setShowPassword((s) => !s)}
                >
                  {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </button>
                <label htmlFor="password">password</label>
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
              <div className="relative w-full">
                <label htmlFor="confirmPassword">Confirm Password</label>
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
              <div className="flex items-center gap-3 py-4">
                <button
                  disabled={!formIsValid}
                  className="bg-stone-800 w-full rounded-full px-5 py-3 text-white disabled:cursor-not-allowed"
                >
                  {loading ? "Loading..." : "Signup"}
                </button>
                <Link
                  to="/login"
                  className="text-stone-900 hover:text-teal-500 transition-all duration-300 flex justify-center items-center"
                >
                  Login
                  <HiArrowLongRight size={25} />{" "}
                </Link>
              </div>
            </div>
          </form>
        </div>
      </AuthLayout>
    </>
  );
}

export default Signup;
