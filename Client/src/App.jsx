import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import PostedBlogs from './Components/PostedBlogs'
import Loign from './Components/Loign'
import Register from './Components/Register'
import CreateBlog from './Components/CreateBlog'
import Blogs from './Pages/Blogs'
import BlogEdit from './Pages/BlogEdit'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Route, Routes, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const App = () => {
  const userToken = useSelector((state) => state.Authentication);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken.legth > 0) {
      navigate('/')
    }
  }, [userToken])

  return (
    <>
      <header>
        <Navbar />
      </header>

      <Routes>
        <Route index element={<PostedBlogs />} />
        <Route path='/login' element={<Loign />} />
        <Route path='/register' element={<Register />} />
        <Route path='/create' element={<CreateBlog />} />
        <Route path='/blog/:id' element={<Blogs />} />
        <Route path='/blog/edit/:id' element={<BlogEdit />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
