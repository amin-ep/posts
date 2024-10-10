import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "../../utils/helpers";

export const fetchAllPosts = createAsyncThunk(
  "post/fetchPosts",
  async function fetchAllPosts(page, { rejectWithValue }) {
    try {
      const res = await fetch(`${BASE_URL}/posts?page=${page}`);
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.message || err.message || "not found!"
      );
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
  async function (id, { rejectWithValue }) {
    try {
      const res = await axios.get(`${BASE_URL}/posts/${id}`);
      return res.data.data.doc;
    } catch (err) {
      return rejectWithValue(
        err?.response?.message || err.message || "not found!"
      );
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
  async function ({ id, payload }, { rejectWithValue }) {
    try {
      const token = Cookies.get("token");
      const res = await axios.patch(`${BASE_URL}/posts/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res);
      return res.data.data.doc;
    } catch (err) {
      return rejectWithValue(
        err.response.message || err.message || "Not found"
      );
    }
  }
);

const initialState = {
  status: "idle",
  deleting: "idle",
  data: [],
  totalPages: null,
  post: {},
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
        state.data = action.payload.data.docs;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchAllPosts.rejected, (state) => {
        state.status = "error";
      });

    builder
      .addCase(createPost.pending, (state) => {
        state.status = "creating";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "created";
        state.data.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state) => {
        state.status = "error";
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
      })
      .addCase(deletePostById.rejected, (state) => {
        state.status = "error";
        state.error = "There was an error while deleting post";
      });

    builder
      .addCase(updatePostById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePostById.fulfilled, (state, action) => {
        state.status = "idle";
        state.post = action.payload;
      })
      .addCase(updatePostById.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default postSlice.reducer;
