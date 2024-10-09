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
import Spinner from "../../ui/Spinner/Spinner";
import UsersTableDeleteButton from "./UsersTableDeleteButton";

function UsersTable() {
  const customID = useId();
  const { users, status } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetAllUsers());
  }, [dispatch]);

  const tableColumns = [
    {
      id: customID + "Image",
      label: "",
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
      label: "",
      minWidth: 60,
    },
  ];

  if (status === "loading") {
    return <Spinner />;
  } else
    return (
      <>
        <Paper
          sx={{
            width: "70rem",
            maxWidth: "100%",
          }}
        >
          <TableContainer
            sx={{
              borderRadius: "7px",
              maxHeight: `calc(4 * 99px)`,
              overflow: "auto",
            }}
          >
            <Table stickyHeader sx={{ maxHeight: 500 }}>
              <TableHead>
                <TableRow>
                  {tableColumns.map((item) => (
                    <TableCell
                      sx={{
                        minWidth: item.minWidth,
                        color: "#1f2937",
                        fontWeight: 600,
                      }}
                      key={item.id}
                    >
                      {item.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.map((user) => (
                  <TableRow key={user?._id} sx={{ color: "#2b3542" }}>
                    <TableCell>
                      <img
                        src={`http://localhost:3000/static/users/${user?.image}`}
                        alt={user.username}
                        className={`w-20 object-cover h-20 object-center rounded-full ${
                          user?.active === false ? "grayscale" : ""
                        }`}
                        loading="lazy"
                      />
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{formatDate(user.createdAt)}</TableCell>
                    <TableCell>{formatDate(user.updatedAt)}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {user.verified === true ? "Yes" : "Not yet"}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {user.active === true ? "Yes" : "No"}
                    </TableCell>
                    <UsersTableDeleteButton userId={user?._id} />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </>
    );
}

export default UsersTable;
