import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Context, server } from '../main';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import TodoItem from '../components/todoItem';
import { Navigate } from 'react-router-dom';

const Home = () => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isloading, setisLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const {isAuthenticated} = useContext(Context);


  const updateHandler = async(id) => {

    try {
      
      const {data} = await axios.put(`${server}/task/${id}`,{},{
        withCredentials: true 
      });

      toast.success(data.message);
      setRefresh(prev => !prev);

    } catch (error) {
      toast.error(error.response.data.message);
    }

  }
  const deleteHandler = async(id) => {
    try {
      
      const {data} = await axios.delete(`${server}/task/${id}`,{
        withCredentials: true 
      });

      toast.success(data.message);
      setRefresh(prev => !prev);

    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    console.log({title, description})

    setisLoading(true);
    try {
      const {data} = await axios.post(`${server}/task/new`,{
        title,description
      },{
        withCredentials:true,
        headers:{
          "Content-Type": "application/json",
        },
      });

      toast.success(data.message);
      setisLoading(false);
      setRefresh(prev => !prev);
      setTitle('');
      setDescription('');
    } catch (error) {
      toast.error(error.response.data.message);
      setisLoading(false);
    }
  }

  useEffect(() => {

    axios.get(`${server}/task/getMyTasks`,{
      withCredentials:true
    }).then((res) => {
      setTasks(res.data.task);
    }).catch((e) => {
      toast.error(e.response.data.message);
    })

  },[refresh]);

  
  if(!isAuthenticated) return <Navigate to={'/login'}/>

  return (
    <div className="container">
      <div className="login">
      <section>
      <form onSubmit={handleSubmit}>
          <input required value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Title'/>
          <input required value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder='Description'/>
          <button disabled={isloading} type="submit">Add Task</button>
          
        </form>
      </section>
      </div>

      <section className="todosContainer">
      {tasks ? (
      tasks.length > 0 ? (
      tasks.map((i) => (
        <TodoItem key={i._id} title={i.title} description={i.description} isCompleted={i.isCompleted} updateHandler={updateHandler} deleteHandler={deleteHandler} id={i._id} />
      ))
    ) : (
      <p>No tasks available</p>
    )
    ) : ( 
    <p>Loading...</p>
  )}
      </section>
    </div>
  )
}

export default Home
