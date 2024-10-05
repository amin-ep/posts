import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../../utils/helpers";

export const fetchGetAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async () => {
    const token = Cookies.get("token");
    try {
      const res = await axios.get(`${BASE_URL}/users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return err.response.data.message;
    }
  }
);

export const deleteUserById = createAsyncThunk(
  "user/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      await axios.delete(`${BASE_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return id;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const initialState = {
  status: "idle",
  users: [],
  errorMessage: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetAllUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGetAllUsers.fulfilled, (state, action) => {
        state.status = "idle";
        state.users = action.payload?.data?.docs;
      })
      .addCase(fetchGetAllUsers.rejected, (state) => {
        state.status = "error";
        state.error = "There was an error while fetching data";
      });

    builder
      .addCase(deleteUserById.pending, (state) => {
        state.status = "deleting";
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.status = "idle";
        state.users = state.users.filter((el) => el._id !== action.payload);
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.status = "error";
        state.errorMessage = action.payload;
      });
  },
});

export default userSlice.reducer;
