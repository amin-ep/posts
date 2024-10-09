import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "../../ui/Container/Container";
import { useNotification } from "../../hooks/useNotification";
import axios from "axios";
import { BASE_URL } from "../../utils/helpers";
import VerifyForm from "../../features/verify/VerifyForm";

function Verify() {
  const { key } = useParams();

  const { notify } = useNotification();

  const getUserByVerificationKey = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users/verifyEmail/${key}`);

      return res;
    } catch {
      notify("error", "An error occurred while fetching data");
    }
  }, [key, notify]);

  useEffect(() => {
    getUserByVerificationKey();
  }, [getUserByVerificationKey]);

  return (
    <div className="bg-gray-200 h-dvh">
      <Container size="extra-small" extraClasses="rounded-lg mt-[10%] py-10">
        <header className="text-center text-gray-800 text-2xl pb-10">
          <h1>Verify Your Email</h1>
        </header>
        <VerifyForm />
      </Container>
    </div>
  );
}

export default Verify;
