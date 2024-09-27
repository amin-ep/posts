import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function useNotification() {
  const toastifyOptions = {
    position: "top-center",
    theme: "colored",
    autoClose: 10000,
    draggable: "mouse",
  };
  const notify = (status, message) => {
    switch (status) {
      case "success":
        {
          toast.success(message, toastifyOptions);
        }
        break;

      case "error":
        {
          toast.error(message, toastifyOptions);
        }

        break;

      default: {
        toast("Something went wrong");
      }
    }
  };

  return { notify };
}
