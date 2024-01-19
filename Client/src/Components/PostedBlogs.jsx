import React, { useEffect, useState } from 'react'
import AllBlogs from './AllBlogs'
import '../Styles/Blogs.css'
import axios from 'axios'
import Loading from './Loading'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setProfile, clearProfile } from '../Features/VerifiedUser.Slice'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostedBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [load, setLoad] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userToken = useSelector((state) => state.Authentication);
    const verifiedData = useSelector((state) => state.VerifiedUser);
    const userName = verifiedData && verifiedData.userName;

    // To get the data of all blogs
    const getBlogData = async () => {
        try {
            setLoad(true);
            const response = await axios.get('https://blog-backend-api-99h6.onrender.com/api/v1/blogs');
            const data = response.data.foundBlog;
            console.log('Data', data);
            setBlogs(data)
            console.log({
                blogs: blogs,
                userName: userName
            });
        } catch (error) {
            console.log('Unable to get Data');
        } finally {
            setLoad(false);
        }
    }

    // To get the data of all blogs
    const profileInfo = async () => {
        try {
            const response = await axios.get('https://blog-backend-api-99h6.onrender.com/api/v1/login/profile', {
                headers: {
                    Authorization: `bearer ${userToken}`
                }
            })

            const { verifiedUser } = response.data
            dispatch(setProfile(verifiedUser));
            getBlogData();
        } catch (error) {
            dispatch(clearProfile())
            console.log('error while fetching profile info : ', error);
        }
    }

    // To Navigate to View Blog Page
    const handleNavigate = (id) => {
        navigate(`/blog/${id}`)
    }
    // Navigate to Edit Blog Page
    const handleEdit = (id) => {
        navigate(`/blog/edit/${id}`)
    }

    // To Delete Blog
    const handleDeleteBlog = async (id) => {
        try {
            const response = await axios.delete(`https://blog-backend-api-99h6.onrender.com/api/v1/blogs/delete/${id}`);
            if (response.status === 200) {
                toast.success('Blog Deleted', {
                    theme: 'dark',
                    position: "top-center",
                    autoClose: 1500
                })
                getBlogData();
            }
        } catch (error) {
            alert('You Are not authorized to delete this blog');
            console.log('Error While Deleteing Blog', error);
        }
    }

    useEffect(() => {
        getBlogData();
        profileInfo();
    }, []);

    return (
        <>
            {
                load ? <Loading /> :
                    <div className='main'>
                        {
                            userName ? (
                                blogs.filter((e) => e.author === userName)
                                    .map((currElem, index) => {
                                        const { title, summary, image, createdAt, _id, author } = currElem;
                                        const localTime = new Date(createdAt).toLocaleString();
                                        return (
                                            <AllBlogs
                                                title={title}
                                                summary={summary}
                                                image={image}
                                                localTime={localTime}
                                                _id={_id}
                                                author={author}
                                                userToken={userToken}
                                                handleNavigate={handleNavigate}
                                                handleEdit={handleEdit}
                                                handleDeleteBlog={handleDeleteBlog}
                                                key={index}
                                            />
                                        )
                                    })
                            ) : (
                                blogs.map((currElem, index) => {
                                    const { title, summary, image, createdAt, _id, author } = currElem;
                                    const localTime = new Date(createdAt).toLocaleString();
                                    return (
                                        <AllBlogs
                                            title={title}
                                            summary={summary}
                                            image={image}
                                            localTime={localTime}
                                            _id={_id}
                                            author={author}
                                            userToken={userToken}
                                            handleNavigate={handleNavigate}
                                            handleEdit={handleEdit}
                                            handleDeleteBlog={handleDeleteBlog}
                                            key={index}
                                        />
                                    )
                                })
                            )
                        }
                    </div>
            }
        </>
    )
}

export default PostedBlogs
