import React, { useEffect, useState } from 'react'
import BlogEditor from '../Components/BlogEditor';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BlogEdit = () => {

    const [input, setInput] = useState({
        title: "",
        summary: ""
    });

    const [content, setContent] = useState("");

    const [image, setImage] = useState(null);

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
            const formData = new FormData();

            formData.append('title', input.title);
            formData.append('summary', input.summary);
            formData.append('content', content);
            formData.append('image', image);

            const response = await axios.put(`http://localhost:3000/api/v1/blogs/edit/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })

            if (response.status === 200) {
                alert('Updated');
                navigate('/')
            }

            console.log(response.data);
        } catch (error) {
            console.log('Unable to update Blog : ', error);
            alert('Unable to update Blog')
        }
    }

    const fillOlderContent = async () => {
        const response = await axios.get(`http://localhost:3000/api/v1/blogs/${id}`);
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
                <input type="text" name="title" value={input.title} onChange={handleInputs} />
                <input type="text" name="summary" value={input.summary} onChange={handleInputs} />
                <input type="file" onChange={handleFile} />
                <BlogEditor
                    value={content}
                    onChange={newValue => setContent(newValue)}
                />

                <button type="submit">Create</button>
            </form>
        </>
    )
}

export default BlogEdit


