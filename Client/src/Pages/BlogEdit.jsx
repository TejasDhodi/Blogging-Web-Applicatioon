import React, { useEffect, useState } from 'react'
import BlogEditor from '../Components/BlogEditor';
import axios from 'axios';
import { DNA } from 'react-loader-spinner'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BlogEdit = () => {

    const verifiedData = useSelector((state) => state.VerifiedUser);
    const userName = verifiedData && verifiedData.userName;

    const [input, setInput] = useState({
        title: "",
        summary: "",
        author: userName
    });

    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [errorMsg, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const { id } = useParams();
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

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const formData = new FormData();

            formData.append('title', input.title);
            formData.append('summary', input.summary);
            formData.append('content', content);
            formData.append('author', input.author);
            formData.append('image', image);

            const response = await axios.put(`https://blog-backend-api-99h6.onrender.com/api/v1/blogs/edit/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })

            if (response.status === 200) {
                toast.success('Post Updated Successfully', {
                    theme: 'dark',
                    position: "top-center",
                    autoClose: 1500
                })
                navigate('/')
            }

            console.log(response.data);
        } catch (error) {
            setErrorMessage(error.response.data);
            toast.warning(error.response.data.message, {
                position: 'top-center',
                theme: 'dark',
                autoClose: 1500,
            })
            console.log('Unable to update Blog : ', error);
        } finally {
            setLoading(false)
        }
    }

    const fillOlderContent = async () => {
        const response = await axios.get(`https://blog-backend-api-99h6.onrender.com/api/v1/blogs/${id}`);
        const data = response.data.singleBlog;

        setInput({
            title: data.title,
            summary: data.summary
        })

        setContent(data.content);
        setImage(data.image)
    }

    useEffect(() => {
        fillOlderContent();
    }, [])
    return (
        <>
            <form className="main" onSubmit={handleUpdate}>
                <div className="fields">
                    <h2 className='headTitle'>Update Post</h2>
                    <div className="inputs">
                        <label htmlFor="title">Title</label>
                        <input type="text" id='title' name="title" value={input.title} onChange={handleInputs} />
                    </div>
                    <div className="inputs">
                        <label htmlFor="summary">Summary</label>
                        <input type="text" id='summary' name="summary" value={input.summary} onChange={handleInputs} />
                    </div>
                    <div className="inputs">
                        <label htmlFor="author">Author</label>
                        <input type="text" id='author' name="author" value={input.author} onChange={handleInputs} required />
                    </div>
                    <div className="inputs">
                        <label htmlFor="image"></label>
                        <input type="file" id='image' onChange={handleFile} />
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
                        loading ? <DNA /> : <button type="submit"> Update</button>
                    }
                </div>
            </form>
        </>
    )
}

export default BlogEdit


