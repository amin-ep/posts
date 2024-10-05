/* eslint-disable react/prop-types */
import { TableCell } from "@mui/material";
import { useState } from "react";
import MessageModal from "../../ui/MessageModal";
import { deleteUserById } from "./userSlice";
import { useSelector, useDispatch } from "react-redux";
import { HiOutlineTrash } from "react-icons/hi2";
import { useNotification } from "../../hooks/useNotification";

function UsersTableDeleteButton({ userId }) {
  const [throwAlert, setThrowAlert] = useState(false);

  const { status, errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { notify } = useNotification();

  const handleDeleteUser = () => {
    dispatch(deleteUserById(userId))
      .unwrap()
      .then(() => {
        if (errorMessage === "") {
          notify("success", "The user deleted successfully");
          setThrowAlert(false);
        }
      })
      .catch(() => {
        if (errorMessage !== "") {
          notify("error", errorMessage);
        }
      });
  };

  return (
    <TableCell>
      <button
        onClick={() => setThrowAlert(true)}
        className="bg-red-600 flex items-center justify-center text-white p-2 rounded-full hover:shadow-2xl hover:shadow-black/40 hover:bg-red-700"
      >
        <HiOutlineTrash size={25} />
      </button>
      <MessageModal
        title="Deleting"
        isOpen={throwAlert}
        onClose={() => setThrowAlert(false)}
        description="Are you sure you want to delete this user?"
        onAction={handleDeleteUser}
      />
    </TableCell>
  );
}

export default UsersTableDeleteButton;
