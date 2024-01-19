import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DNA } from 'react-loader-spinner'
import '../Styles/Auth.css'
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const [input, setInput] = useState({
        userName: "",
        email: "",
        password: "",
        cpassword: ""
    })

    const [errorMsg, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

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

            const res = await axios.post('https://blog-backend-api-99h6.onrender.com/api/v1/register', input, {
                headers: {
                    "Content-Type": 'application/json'
                }
            })

            const data = res.data;
            if (res.status === 201) {
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
                  })
                navigate('/login')

            }
            setErrorMessage("");
            console.log('userData', data);
        } catch (error) {
            setErrorMessage(error.response.data);
            console.log('Unable To Register', error);
        } finally {
            setLoading(false);
        }

    }
    return (
        <div className='formContainer'>
            <form className='register' onSubmit={handleSubmit}>
                <h2 className='headTitle'>Register</h2>
                <div className="inputs">
                    <input type="text" name="userName" value={input.userName} onChange={handleInputs} placeholder='UserName' required />
                    <input type="text" name="email" value={input.email} onChange={handleInputs} placeholder='Email Id' required />
                    <input type="text" name="password" value={input.password} onChange={handleInputs} placeholder='Password' required />
                    <input type='password' name="cpassword" value={input.cpassword} onChange={handleInputs} placeholder='Confirm Password' required />
                </div>

                <div className="controls">
                    {
                        loading ? <DNA /> : <button type="submit"> Submit</button>
                    }
                </div>

                <div className="details">
                    <p>Already have an Account?? <Link to={'/login'}>Click Here</Link> </p>
                    {
                        errorMsg && <span className='errMsg'>{JSON.stringify(errorMsg.message)}</span>
                    }
                </div>
            </form>
        </div>
    )
}

export default Register
