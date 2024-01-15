import React, { useEffect, useState } from 'react'
import '../Styles/Auth.css'
import axios from 'axios'
import { setToken } from '../Features/Auth.Slice'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { DNA } from 'react-loader-spinner'
import 'react-toastify/dist/ReactToastify.css';

const Loign = () => {

  const [input, setInput] = useState({
    email: "",
    password: ""
  })
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleInputs = (e) => {
    const { name, value } = e.target;

    setInput((prevData) => ({
      ...prevData, [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await axios.post('http://localhost:3000/api/v1/login', input, {
        headers: {
          "Content-Type": 'application/json'
        }
      })

      if (res.status === 201) {
        dispatch(setToken(res.data.token))
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          // transition: Bounce,
        });
        setInput({
          email: "",
          password: ""
        })
        navigate('/')
      }

    } catch (error) {
      setErrorMsg(error.response.data);
      console.log('Error During Login', error);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='formContainer'>
      <form className='login' onSubmit={handleSubmit}>
        <h2 className='headTitle'>Login</h2>
        <div className="inputs">
          <input type="text" name="email" value={input.email} onChange={handleInputs} placeholder='Email Id' required />
          <input type="text" name="password" value={input.password} onChange={handleInputs} placeholder='Password' required />
        </div>
        <div className="controls">
          {
            loading ? <DNA /> : <button type="submit"> Submit</button>
          }
        </div>
        <div className="details">
          <p>Don't have an Account?? <Link to={'/register'}>Click Here</Link> </p>
          {
            errorMsg && <span className='errMsg'>{JSON.stringify(errorMsg.message)}</span>
          }
        </div>
      </form>
    </div>
  )
}

export default Loign
