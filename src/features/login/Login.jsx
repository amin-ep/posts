import { HiOutlineUser } from "react-icons/hi2";
import Input from "../../ui/Input";
import { useAuthentication } from "../../contexts/AuthContent";
import { useInput } from "../../hooks/useInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/validators";
import { validatePassword } from "../../utils/validators";
import AuthLayout from "../../ui/AuthLayout";
import { useNotification } from "../../hooks/useNotification";
import { ToastContainer } from "react-toastify";
import HomeLink from "../../ui/HomeLink";

function Login() {
  const { login, loading } = useAuthentication();
  const { notify } = useNotification();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login({
      email: enteredEmail,
      password: enteredPassword,
    });

    if (result.status === "fail") {
      notify("error", result.message);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <ToastContainer limit={3} />
      <AuthLayout background="primary">
        <HomeLink />
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
            background="bg-white"
            hasError={emailHasError}
          />

          <Input
            id="password"
            placeholder="Password"
            onBlur={handlePasswordBlur}
            onChange={handlePasswordChange}
            value={enteredPassword}
            type="password"
            hasError={passwordHasError}
            background="bg-white"
          />

          <div className="flex">
            <button
              disabled={!formIsValid}
              className="bg-stone-800 w-full rounded-full px-5 py-3 text-white disabled:cursor-not-allowed"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Link to="/forgetPassword">Forget Password?</Link>
            <Link to="/signup">Do not have account?</Link>
          </div>
        </form>
      </AuthLayout>
    </>
  );
}

export default Login;
