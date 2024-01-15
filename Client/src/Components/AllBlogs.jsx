import React from 'react'
import { FaRegEdit, FaTrash } from 'react-icons/fa'
import { CiRead } from "react-icons/ci";
const AllBlogs = ({ title, summary, image, localTime, _id, auther, userToken, handleNavigate, handleEdit, handleDeleteBlog }) => {
    return (
        <>
            <div className="blogs">
                <div className="post">
                    <div className="postImage">
                        <img src={image} alt={title} />
                    </div>
                    <div className="postDescription">
                        <h2 className='postTitle'>{title}</h2>
                        <div className="info">
                            <p className="time">Created At : {localTime} </p>
                            <p>Created By : {auther}</p>
                        </div>
                        <p className='postSummary'>{summary}</p>
                    </div>
                </div>
                <div className="controls">
                    <CiRead className='view' onClick={() => handleNavigate(_id)} />
                    {
                        userToken && userToken.length !== 0 ? (
                            <>
                                < FaRegEdit className='edit' onClick={() => handleEdit(_id)} Edit />
                                < FaTrash className='delete' onClick={() => handleDeleteBlog(_id)} Delete />
                            </>
                        ) : null
                    }
                </div>
            </div>
        </>

    )
}

export default AllBlogs
