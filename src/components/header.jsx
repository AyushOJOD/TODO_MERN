import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context, server } from '../main'
import toast from 'react-hot-toast';
import axios from 'axios';

const Header = () => {

  const {isAuthenticated, setisAuthenticated, isLoading, setisLoading} = useContext(Context);

  const logoutHandler = async() => {
    setisLoading(true);
    try {
      const {data} = await axios.get(`${server}/users/logout`,{
        withCredentials: true
      }
      );
      toast.success("Logged Out Successfully");
      setisAuthenticated(false);
      setisLoading(false);
      window.location.reload();
    } catch (e) {
      toast.error(e.response.data.message);
      setisAuthenticated(true);
      console.log(e);
      setisLoading(false);
    }
  }
  
  return (
    <nav className='header'>
        <div>
            <h2>TODO App.</h2>
        </div>
        <article>
            <Link to={'/'}>Home</Link>
            <Link to={'/profile'}>Profile</Link>
            {
              isAuthenticated? <button className='btn' disabled={isLoading} onClick={logoutHandler}>Logout</button>
              : <Link to={'/login'}>Login</Link> 
            }
        </article>
    </nav>
  )
}

export default Header
