import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./features/post/postSlice";
import commentSlice from "./features/comments/commentSlice";
import userSlice from "./features/users/userSlice";

const store = configureStore({
  reducer: {
    post: postSlice,
    comment: commentSlice,
    user: userSlice,
  },
});

export default store;
