import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../../utils/helpers";

const initialState = {
  status: "idle",
  data: [],
};

export const fetchGetCommentsOnPost = createAsyncThunk(
  "comment/getAllComments",
  async (postId) => {
    const token = Cookies.get("token");
    try {
      const res = await axios.get(`${BASE_URL}/posts/${postId}/comments`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return res.data.data.comments;
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchCreateCommentOnPost = createAsyncThunk(
  "comment/createComment",
  async function (payload, postId) {
    const token = Cookies.get("token");
    try {
      const res = await axios.post(
        `${BASE_URL}/posts/${postId}/comments`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return res.data.data.doc;
    } catch (err) {
      console.log(err);
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchGetCommentsOnPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGetCommentsOnPost.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      })
      .addCase(fetchGetCommentsOnPost.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload.error;
      });

    builder
      .addCase(fetchCreateCommentOnPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCreateCommentOnPost.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = [...state.data, action.payload];
      })
      .addCase(fetchCreateCommentOnPost.rejected, (state) => {
        state.status = "error";
        state.error = "There was an error while creating comment";
      });
  },
});

export default commentSlice.reducer;

// export const { createComment } = commentSlice.actions;
