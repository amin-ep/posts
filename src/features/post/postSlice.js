import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "../../utils/helpers";

export const fetchAllPosts = createAsyncThunk(
  "post/fetchPosts",
  async function fetchAllPosts() {
    try {
      const res = await fetch(`${BASE_URL}/posts`);
      const data = await res.json();

      return data.data.docs;
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchCreatePost = createAsyncThunk(
  "post/createPost",
  async function (payload) {
    const token = Cookies.get("token");
    try {
      const res = await axios.post(`${BASE_URL}/posts`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
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
  data: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      })
      .addCase(fetchAllPosts.rejected, (state) => {
        state.status = "error";
        state.error = "There was an error while fetching data";
      });

    builder
      .addCase(fetchCreatePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCreatePost.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = state.data.push(action.payload);
      })
      .addCase(fetchCreatePost.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
    // builder
    //   .addCase(fetchLikePost.pending, (state) => {
    //     state.status = "loading";
    //   })
    //   .addCase(fetchLikePost.fulfilled, (state, action) => {
    //     state.status = "idle";
    //     state.data.likes = [...state.data.likes, action.payload];
    //   })
    //   .addCase(fetchLikePost.rejected, (state) => {
    //     state.status = "error";
    //     state.error = "There was an error while liking the post";
    //   });
  },
});

export default postSlice.reducer;
