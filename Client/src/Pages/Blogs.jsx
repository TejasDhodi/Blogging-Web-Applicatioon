import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';

const Blogs = () => {
    const [blog, setBlog] = useState(null);

    const { id } = useParams();

    const handleSingleBlog = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/blogs/${id}`);
            const data = response.data.singleBlog;
            setBlog(data);
            console.log(data);

        } catch (error) {
            console.log('Unable to get single blog data ', error);
        }
    }

    useEffect(() => {
        handleSingleBlog();
    }, [])
    return (
        <div>
            {
                blog ? (
                    <div className='viewBlog main'>
                        <img src={blog.image} alt="" />
                        <h1>{blog.title}</h1>
                        <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
                    </div>
                ) : ''
            }
        </div>
    )
}

export default Blogs