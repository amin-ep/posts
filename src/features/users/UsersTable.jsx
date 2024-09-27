import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetAllUsers } from "./userSlice";
import { useEffect, useId } from "react";
import { formatDate } from "../../utils/helpers";
import { HiOutlineTrash } from "react-icons/hi2";

function UsersTable() {
  const customID = useId();
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetAllUsers());
  }, [dispatch]);

  const tableColumns = [
    {
      id: customID + "Image",
      label: "Image",
      minWidth: 120,
    },
    {
      id: customID + "email",
      label: "Email Address",
      minWidth: 230,
    },
    {
      id: customID + "username",
      label: "Username",
      minWidth: 140,
    },
    {
      id: customID + "role",
      label: "Role",
      minWidth: 50,
    },
    {
      id: customID + "createdAt",
      label: "Created At",
      minWidth: 140,
    },
    {
      id: customID + "updatedAt",
      label: "Updated At",
      minWidth: 140,
    },
    {
      id: customID + "verified",
      label: "Verified",
      minWidth: 60,
    },
    {
      id: customID + "active",
      label: "Active",
      minWidth: 60,
    },
    {
      id: customID + "delete",
      label: "Delete",
      minWidth: 60,
    },
  ];

  return (
    <Paper sx={{ width: "70rem", maxWidth: "100%" }}>
      <TableContainer sx={{ borderRadius: "7px" }}>
        <Table stickyHeader sx={{ maxHeight: 500 }}>
          <TableHead>
            <TableRow>
              {tableColumns.map((item) => (
                <TableCell sx={{ minWidth: item.minWidth }} key={item.id}>
                  {item.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.data?.docs.map((user) => (
              <TableRow key={user?.id}>
                <TableCell>
                  <img
                    src={`http://localhost:3000/static/users/${user.image}`}
                    alt={user.username}
                    className={`w-20 object-cover h-20 object-center rounded-full ${
                      user?.active === false ? "grayscale" : ""
                    }`}
                  />
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{formatDate(user.createdAt)}</TableCell>
                <TableCell>{formatDate(user.updatedAt)}</TableCell>
                <TableCell>
                  {user.verified === true ? "Yes" : "Not yet"}
                </TableCell>
                <TableCell>{user.active === true ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <button className="bg-red-600 flex items-center justify-center text-white p-2 rounded-full hover:shadow-2xl hover:shadow-black/40 hover:bg-red-700">
                    <HiOutlineTrash size={25} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default UsersTable;
