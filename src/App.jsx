import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContent";
import { ToastContainer } from "react-toastify";
import PageLoader from "./ui/PageLoader/PageLoader";

const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/login/Login"));
const Signup = lazy(() => import("./pages/signup/Signup"));
const ForgetPassword = lazy(() =>
  import("./pages/forgetPassword/ForgetPassword")
);
const Users = lazy(() => import("./pages/users/Users"));
const Layout = lazy(() => import("./layout/Layout"));
const CreatePost = lazy(() => import("./pages/createPost/CreatePost"));
const Post = lazy(() => import("./pages/post/Post"));
const EmailGate = lazy(() => import("./pages/EmailGate/EmailGate"));
const Verify = lazy(() => import("./pages/verify/Verify"));
const Account = lazy(() => import("./pages/account/Account"));
const ChangePassword = lazy(() =>
  import("./pages/changePassword/ChangePassword")
);
const ResetPassword = lazy(() => import("./pages/resetPassword/ResetPassword"));
const UpdatePost = lazy(() => import("./pages/updatePost/UpdatePost"));
const About = lazy(() => import("./pages/about/About"));

function App() {
  return (
    <BrowserRouter>
      <ToastContainer limit={3} />
      <Suspense fallback={<PageLoader />}>
        <AuthProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Navigate replace to="/home" />} />
              <Route path="home" element={<Home />} />
              <Route path="resetPassword/:id" />
              <Route path="users" element={<Users />} />
              <Route path="create-post" element={<CreatePost />} />
              <Route path="post/:id" element={<Post />} />
              <Route path="account" element={<Account />} />
              <Route path="update-post/:id" element={<UpdatePost />} />
              <Route path="signup" element={<Signup />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="forgetPassword" element={<ForgetPassword />} />
            <Route path="reset-password/:key" element={<ResetPassword />} />
            <Route path="email-message" element={<EmailGate />} />
            <Route path="verify/:key" element={<Verify />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="about" element={<About />} />
          </Routes>
        </AuthProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
