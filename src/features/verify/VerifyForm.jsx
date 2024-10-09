import { useAuthentication } from "../../contexts/AuthContent";
import Input from "../../ui/Input";
import { useInput } from "../../hooks/useInput";
import LinkButton from "../../ui/LinkButton";
import { useNavigate, useParams } from "react-router-dom";
import { useNotification } from "../../hooks/useNotification";

const validateInputNumber = (value) => value.length == 8;

function VerifyForm() {
  const { verifyAccount, loading: isVerifying } = useAuthentication();

  const { key } = useParams();

  const navigate = useNavigate();

  const {
    handleInputBlur,
    handleInputChange,
    value: enteredNumber,
    inputHasError,
    inputIsValid,
    reset,
  } = useInput(validateInputNumber);

  const { notify } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await verifyAccount(key, { number: enteredNumber });

    if (result === "success") {
      navigate("/home");
      notify("success", "your account verified successfully");
      reset();
    } else {
      notify("error", "Invalid number");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center w-80 max-w-full mt-0 mx-auto gap-3"
    >
      <div>
        <Input
          inputMode="numeric"
          hasError={inputHasError}
          name="number-input"
          id="number-input"
          type="number"
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          value={enteredNumber}
        />
        {inputHasError && (
          <p className="text-error">
            Please input the code that we sent to you!
          </p>
        )}
      </div>
      <div>
        <LinkButton
          disabled={isVerifying || !inputIsValid}
          type="submit"
          background="indigo"
        >
          {isVerifying ? "Verifying..." : "Click To Verify"}
        </LinkButton>
      </div>
    </form>
  );
}

export default VerifyForm;
