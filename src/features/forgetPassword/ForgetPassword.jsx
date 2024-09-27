import { useInput } from "../../hooks/useInput";
import Input from "../../ui/Input";
import { useAuthentication } from "../../contexts/AuthContent";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../ui/AuthLayout";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await forgetPassword(enteredEmail);

    if (result.status === "fail") {
      console.log(result);
    } else if (result.status === "success") {
      sessionStorage.setItem("authEmail", enteredEmail);
      navigate("/login");
    }
  };

  return (
    <div
      className="bg-fixed bg-no-repeat bg-center bg-cover"
      style={{
        backgroundImage: `url(${"/public/images/laptop-background.jpg"})`,
      }}
    >
      <AuthLayout
        background="secondary"
        className="flex items-center justify-center h-dvh"
      >
        <form
          className="p-10 rounded-lg shadow-2xl bg-teal-500 shadow-stone-900 flex flex-col gap-4"
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
            <button
              disabled={!formIsValid}
              className="bg-stone-800 w-full rounded-full px-5 py-3 text-white disabled:cursor-not-allowed"
              type="submit"
            >
              {loading ? "Loading..." : "Reset My Password"}
            </button>
            <Link className="text-white" to={-1}>
              Back To Login
            </Link>
          </div>
        </form>
      </AuthLayout>
    </div>
  );
}

export default ForgetPassword;
