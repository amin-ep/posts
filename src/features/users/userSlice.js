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
      console.log(err);
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
  result: {
    statusCode: null,
    message: "",
  },
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
        state.users = action.payload;
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
        state.result.statusCode = 204;
        state.result.message = "The user deleted successfully";
        console.log(action.payload);
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.status = "error";
        state.result.message = action.payload;
        console.log(action.payload);
        state.result.statusCode = 500;
      });
  },
});

export default userSlice.reducer;
