import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./styles/app.scss"
import { createContext } from 'react'

export const server = "https://nodejs-todoapp-ju6c.onrender.com/api/v1";

export const Context = createContext({isAuthenticated: false});

const AppWraper = () => {

  const [isAuthenticated, setisAuthenticated] = useState(false); 
  const [isLoading, setisLoading] = useState(false);  
  const [user, setUser] = useState({});    

   return (
    <Context.Provider value={{isAuthenticated, setisAuthenticated, isLoading, setisLoading, user, setUser}}>
      <App /> 
    </Context.Provider>
   )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWraper/>
  </React.StrictMode>,
)
