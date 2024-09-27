import { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PageLoader from "./ui/PageLoader/PageLoader";
import Dashboard from "./features/dashboard/Dashboard";
import Login from "./features/login/Login";
import Signup from "./features/signup/Signup";
import ForgetPassword from "./features/forgetPassword/ForgetPassword";
import Users from "./pages/users/Users";
import Layout from "./layout/Layout";
import CreatePost from "./features/createPost/CreatePost";
import { AuthProvider } from "./contexts/AuthContent";
import Post from "./features/post/Post";
import EmailGate from "./pages/EmailGate/EmailGate";
import Verify from "./pages/verify/Verify";
import Account from "./pages/account/Account";
import ChangePassword from "./pages/changePassword/ChangePassword";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import UpdatePost from "./pages/updatePost/UpdatePost";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <AuthProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Navigate replace to="/dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="resetPassword/:id" />
              <Route path="users" element={<Users />} />
              <Route path="createPost" element={<CreatePost />} />
              <Route path="post/:id" element={<Post />} />
              <Route path="account" element={<Account />} />
              <Route path="update-post/:id" element={<UpdatePost />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgetPassword" element={<ForgetPassword />} />
            <Route path="reset-password/:key" element={<ResetPassword />} />
            <Route path="email-message" element={<EmailGate />} />
            <Route path="verify/:key" element={<Verify />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Routes>
        </AuthProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
