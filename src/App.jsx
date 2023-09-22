import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/home";
import Header from "./components/header";
import Profile from "./pages/profile"
import Login from "./pages/login";
import Register from "./pages/register"
import {Toaster} from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context, server } from "./main";

function App() {

  const {setisAuthenticated, setUser, setisLoading} = useContext(Context);

  useEffect(() => {

    setisLoading(true);

    axios.get(`${server}/users/userid/user`,{
      withCredentials: true
    }).then(res => {
      setUser(res.data.user);
      setisAuthenticated(true);
      setisLoading(false);
    }).catch(e => {
      setUser({});
      setisAuthenticated(false);
      setisLoading(false);
    })

  },[])

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
      <Toaster/>
    </Router>
  )
}

export default App
