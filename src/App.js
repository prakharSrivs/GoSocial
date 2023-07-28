import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import Home from './Components/Home/Home';
import DetailedFeeds from "./Components/DetailedFeeds/DetailedFeeds";
import CreatePost from "./Components/CreatePost/CreatePost";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path='/feed' element={<DetailedFeeds />} />
        <Route path="/post/create" element={<CreatePost/>} />
        <Route path="/user/login" element={<Login/>} />
        <Route path="/user/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
