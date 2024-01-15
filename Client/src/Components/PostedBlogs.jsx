import React, { useEffect, useState } from 'react'
import AllBlogs from './AllBlogs'
import '../Styles/Blogs.css'
import axios from 'axios'
import Loading from './Loading'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setProfile, clearProfile } from '../Features/VerifiedUser.Slice'

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
            const response = await axios.get('http://localhost:3000/api/v1/blogs');
            const data = response.data.foundBlog;
            console.log('Data', data);
            setBlogs(data)
        } catch (error) {
            console.log('Unable to get Data');
        } finally {
            setLoad(false);
        }
    }

    // To get the data of all blogs
    const profileInfo = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/login/profile', {
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

    const handleNavigate = (id) => {
        navigate(`/blog/${id}`)
    }

    const handleEdit = (id) => {
        navigate(`/blog/edit/${id}`)
    }

    const handleDeleteBlog = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/v1/blogs/delete/${id}`);
            if (response.status === 200) {
                alert('Blog Deleted')
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
                                blogs.filter((e) => e.auther === userName)
                                    .map((currElem, index) => {
                                        const { title, summary, image, createdAt, _id, auther } = currElem;
                                        const localTime = new Date(createdAt).toLocaleString();
                                        return (
                                            <AllBlogs
                                                title={title}
                                                summary={summary}
                                                image={image}
                                                localTime={localTime}
                                                _id={_id}
                                                auther={auther}
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
                                    const { title, summary, image, createdAt, _id, auther } = currElem;
                                    const localTime = new Date(createdAt).toLocaleString();
                                    return (
                                        <AllBlogs
                                            title={title}
                                            summary={summary}
                                            image={image}
                                            localTime={localTime}
                                            _id={_id}
                                            auther={auther}
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
