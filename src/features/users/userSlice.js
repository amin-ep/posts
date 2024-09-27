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

const initialState = {
  status: "idle",
  users: [],
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
  },
});

export default userSlice.reducer;
