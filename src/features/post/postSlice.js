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

export const createPost = createAsyncThunk(
  "post/createPost",
  async function (payload, { rejectWithValue }) {
    const token = Cookies.get("token");
    try {
      const res = await axios.post(`${BASE_URL}/posts`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data.data.doc;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getPostById = createAsyncThunk(
  "post/getPost",
  async function (id) {
    try {
      const res = await axios.get(`${BASE_URL}/posts/${id}`);
      return res.data.data.doc;
    } catch (err) {
      if (err.status === 404) {
        return "Not found!";
      }
    }
  }
);

export const deletePostById = createAsyncThunk(
  "post/deletePost",
  async function (id) {
    try {
      const token = Cookies.get("token");
      await axios.delete(`${BASE_URL}/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
);

export const updatePostById = createAsyncThunk(
  "post/updatePost",
  async function ({ id, payload }) {
    try {
      const token = Cookies.get("token");
      const res = await axios.patch(`${BASE_URL}/posts/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data.data.doc;
    } catch (err) {
      console.log(err);
    }
  }
);

const initialState = {
  status: "idle",
  deleting: "idle",
  data: [],
  post: {},
  result: {
    statusCode: null,
    message: "",
  },
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
      .addCase(createPost.pending, (state) => {
        state.status = "creating";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "idle";
        state.data.unshift(action.payload);
        state.result.statusCode = 201;
        state.result.message = "Your new post published successfully";
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
        state.result.statusCode = 500;
        state.result.message = "Something went wrong while creating post";
      });
    builder
      .addCase(getPostById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.status = "idle";
        state.post = action.payload;
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });

    builder
      .addCase(deletePostById.pending, (state) => {
        state.status = "deleting";
      })
      .addCase(deletePostById.fulfilled, (state) => {
        state.status = "idle";
        state.post = {};
        state.result.statusCode = 204;
        state.result.message = "Your post deleted successfully";
      })
      .addCase(deletePostById.rejected, (state) => {
        state.status = "error";
        state.error = "There was an error while deleting post";
        state.result.statusCode = 500;
        state.result.message = "There was an error while deleting your post";
      });

    builder
      .addCase(updatePostById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePostById.fulfilled, (state, action) => {
        state.status = "idle";
        state.post = action.payload;
        state.result.statusCode = 200;
        state.result.message = "Your post updated successfully";
      })
      .addCase(updatePostById.rejected, (state) => {
        state.status = "error";
        state.result.message = "An error occurred while updating post";
        state.result.statusCode = 500;
      });
  },
});

export default postSlice.reducer;
