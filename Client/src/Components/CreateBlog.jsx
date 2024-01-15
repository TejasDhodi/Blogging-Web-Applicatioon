import React, { useState } from 'react'
import BlogEditor from './BlogEditor';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { DNA } from 'react-loader-spinner'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const CreateBlog = () => {
    const verifiedData = useSelector((state) => state.VerifiedUser);
    const userName = verifiedData && verifiedData.userName

    const [input, setInput] = useState({
        title: "",
        summary: "",
        auther: userName
    });

    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [errorMsg, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setInput((prevData) => ({
            ...prevData, [name]: value
        }))
    }

    const handleFile = (e) => {
        const selectedFile = e.target.files[0];
        setImage(selectedFile)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append('title', input.title);
            formData.append('summary', input.summary);
            formData.append('auther', input.auther);
            formData.append('content', content);
            formData.append('image', image);

            const response = await axios.post('http://localhost:3000/api/v1/createBlog', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })

            if (response.status === 201) {
                toast.success('Post Created Successfully', {
                    theme: 'dark',
                    position: "top-center"
                })
                navigate('/')
            }
            console.log(response.data);

        } catch (error) {
            setErrorMessage(error.response.data);
            toast.warning(error.response.data.message)
            // alert('Unable to Create Blog')
        } finally {
            setLoading(false)
        }
    }

    return (

        <form className="createPost main" onSubmit={handleSubmit}>
            <div className="fields">
                <h2 className='headTitle'>Create post</h2>
                <div className="inputs">
                    <label htmlFor="title">Title</label>
                    <input type="text" id='title' name="title" value={input.title} onChange={handleInputs} placeholder='Add Title Of Your Blog' required />
                </div>
                <div className="inputs">
                    <label htmlFor="summary">Summary</label>
                    <input type="text" id='summary' name="summary" value={input.summary} onChange={handleInputs} placeholder='Add Summary Of Your Blog' required />
                </div>
                <div className="inputs">
                    <label htmlFor="auther" >Auther</label>
                    <input type="text" id='auther' name="auther" value={input.auther} onChange={handleInputs} readOnly required />
                </div>
                <div className="inputs">
                    <label htmlFor="image">Image</label>
                    <input type="file" id='image' onChange={handleFile} required />
                </div>
                <div className="errors">
                    {
                        errorMsg && <p className='errMsg'>{JSON.stringify(errorMsg).slice(34).split('"}').join(" ") || JSON.stringify(errorMsg).slice(8).split('"}').join(" ")}</p>
                    }
                </div>
            </div>
            <BlogEditor
                value={content}
                onChange={newValue => setContent(newValue)}
            />

            <div className="controls">
                {
                    loading ? <DNA /> : <button type="submit"> Submit</button>
                }
            </div>

        </form>

    )
}

export default CreateBlog
