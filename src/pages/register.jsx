import React, { useContext, useState } from 'react'
import { Link, Navigate} from 'react-router-dom'
import axios from "axios"
import { Context, server } from '../main';
import toast from 'react-hot-toast';


const Register = () => {

  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const {isAuthenticated, setisAuthenticated, isLoading, setisLoading} = useContext(Context);


  const handleSubmit = async(e) => {
    e.preventDefault();
    setisLoading(true);
    try {
      const {data} = await axios.post(`${server}/users/register`,{  
        name,email,password
      },{
        headers:{
          "Content-Type": "application/json"
        },
        withCredentials: true
      }
      );
      toast.success(data.message);
      setisAuthenticated(true);
      setisLoading(false);
    } catch (e) {
      toast.error(e.message);
      setisAuthenticated(false);
      console.log(e);
      setisLoading(false);
    }
  }

  if(isAuthenticated) return <Navigate to={'/'}/>

  return (
    <div className='login'>
      <section>
        <form onSubmit={handleSubmit}>
          <input required value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Username'/>
          <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email'/>
          <input required value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password'/>
          <button disabled={isLoading} type="submit">Sign Up</button>
          <h4>OR</h4>
          <Link to={'/login'}>Login</Link>
        </form>
      </section>
    </div>
  )
}

export default Register
