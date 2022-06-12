import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { Home } from "./pages/home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "./pages/header/Header";
import { Profile } from "./pages/profile/Profile";
import { Followers } from "./pages/follow/Followers";
import { Followings } from "./pages/follow/Followings";
import { FindPost } from "./pages/post/FindPost";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/followers/:id" element={<Followers />} />
            <Route path="/followings/:id" element={<Followings />} />
            <Route path="/findPost/:id" element={<FindPost />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
