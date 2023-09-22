import React, { useContext } from 'react'
import { Context } from "../main";
import Loader from '../components/loader';
import "../styles/userProfile.css"


const Profile = () => {

  const {isAuthenticated, isLoading, user} = useContext(Context);

  return (
    isLoading? <Loader/>
    : <div className="user-profile">
     <h2 className="profile-header">User Profile</h2>
     <div className="profile-info">
      <p><strong>Username:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  </div>
  )
}

export default Profile
