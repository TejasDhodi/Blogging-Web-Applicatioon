import React, { useEffect, useState } from 'react'
import AllBlogs from './AllBlogs'
import FilterComponent from './FilterComponent'
import Loading from './Loading'
import '../Styles/Blogs.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setProfile, clearProfile } from '../Features/VerifiedUser.Slice'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostedBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [search, setSearch] = useState("");
    const [load, setLoad] = useState(false);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [filterCategory, setFilterCategory] = useState([]);
    const [handleFilter, setHandleFilter] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userToken = useSelector((state) => state.Authentication);
    const verifiedData = useSelector((state) => state.VerifiedUser);
    const userName = verifiedData && verifiedData.userName;
    const findBlogs = userToken.length !== 0 && blogs.filter((e) => e.author === userName);

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

    // To Handle Domain Filter
    const handleDomainFilter = (domain) => {
        console.log('Selected Domain:', domain);

        if (domain === 'All') {
            console.log('Resetting to show all blogs');
            setFilteredBlogs(blogs);
            return;
        }

        const filtered = blogs && blogs.filter((currElem) => {
            return currElem.domain === domain || (currElem.category && currElem.category.includes(domain));
        });

        console.log('Filtered Domains Blogs:', filtered);
        setFilteredBlogs(filtered);
        setHandleFilter(true);

    }


    // To Handle Category Filter
    const handleCategoryFilter = (category) => {
        console.log('Selected Category:', category);
        const filterCateg = filteredBlogs && filteredBlogs.filter((currElem) => {
            return currElem.category === category
        })

        console.log('Filtered Domains Blogs:', filterCateg);
        setHandleFilter(false);
        setFilterCategory(filterCateg);
    }


    useEffect(() => {
        getBlogData();
        profileInfo();
    }, []);

    useEffect(() => {
        setFilteredBlogs(blogs);
        setFilterCategory(blogs)
    }, [blogs]);

    return (
        <>
            {
                load ? <Loading /> :

                    <div className='main'>
                        <div className="filter">
                            <FilterComponent search={search} setSearch={setSearch} handleDomainFilter={handleDomainFilter} handleCategoryFilter={handleCategoryFilter} />
                        </div>
                        <div className="allBlogs">
                            {
                                userName ?
                                    (
                                        (handleFilter? filteredBlogs : filterCategory).filter((e) => e.author === userName).filter((e) => e.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
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
                                        (handleFilter? filteredBlogs : filterCategory).filter((e) => e.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())).map((currElem, index) => {
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
                            {
                                (findBlogs.length === 0) ? <h2 className='noBlogTitle'>No Post Found For {userName}'s Account</h2> : ""
                            }
                        </div>
                    </div>
            }
        </>
    )
}

export default PostedBlogs
