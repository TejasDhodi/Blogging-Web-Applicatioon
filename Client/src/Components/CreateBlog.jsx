import React, { useState } from 'react'
import BlogEditor from './BlogEditor';
import { data } from '../Services/Data';
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
    // console.log(`userName ${userName}`);

    const [input, setInput] = useState({
        title: "",
        summary: "",
        author: userName,
        domain: "",
        category: "",
        technology: ""
    });

    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [errorMsg, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const selectedDomain = data.find((item) => item.value === input.domain);
    const selectedCategory = selectedDomain?.category || [];
    const selectedTechnology = selectedCategory.find((item) => item.value === input.category)?.technology || [];

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setInput((prevData) => ({
            ...prevData,
            [name]: value,
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
            formData.append('content', content);
            formData.append('author', input.author);
            formData.append('domain', input.domain);
            formData.append('category', input.category);
            formData.append('technology', input.technology);
            formData.append('image', image);

            const response = await axios.post('https://blog-backend-api-99h6.onrender.com/api/v1/createBlog', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })

            if (response.status === 201) {
                toast.success('Post Created Successfully', {
                    theme: 'dark',
                    position: "top-center",
                    autoClose: 1500
                })
                navigate('/')
            }
            console.log(response.data);

        } catch (error) {
            setErrorMessage(error.response.data);
            console.log(`error ${JSON.stringify(error.response.data)}`);
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
                    <label htmlFor="author">Author</label>
                    <input type="text" id='author' name="author" value={input.author} onChange={handleInputs} required />
                </div>
                <div className="inputs">

                    <label htmlFor="domain">Domain</label>
                    <select id='domain' name="domain" value={input.domain} onChange={handleInputs} required >
                        <option value="" disabled>Select Domain</option>
                        {
                            data.map((currElem, index) => {
                                const { value, label } = currElem;
                                return (
                                    <option value={value} key={index}>{label}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="inputs">
                    <label htmlFor="category">Category</label>
                    <select id='category' name="category" value={input.category} onChange={handleInputs} required >
                        <option value="" disabled>Select Category</option>
                        {
                            selectedCategory.map((currElem, index) => {
                                const {value, label} = currElem;
                                return (
                                    <option value={value} key={index}>{label}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <div className="inputs">
                    <label htmlFor="technology">technology</label>
                    <select id='technology' name="technology" value={input.technology} onChange={handleInputs} required >
                        <option value="" disabled>Select technology</option>
                        {
                            selectedTechnology.map((currElem, index) => {
                                const {value, label} = currElem;
                                return (
                                    <option value={value} key={index}>{label}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <div className="inputs">
                    <label htmlFor="image">Image</label>
                    <input type="file" id='image' onChange={handleFile} required />
                </div>
                <div className="errors">
                    {
                        errorMsg && <p className='errMsg'>{JSON.stringify(errorMsg).slice(34).split('"}')}</p>
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
