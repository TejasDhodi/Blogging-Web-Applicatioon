import React, { useEffect } from 'react'
import '../Styles/Navbar.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { removeToken } from '../Features/Auth.Slice'
import { clearProfile } from '../Features/VerifiedUser.Slice'
import { useSelector, useDispatch } from 'react-redux'

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userToken = useSelector((state) => state.Authentication);
  const verifiedData = useSelector((state) => state.VerifiedUser);

  const userName = verifiedData && verifiedData.userName;

  const redirectToHome = () => {
    navigate('/');
  }

  const handleLogout = () => {
    toast.success('Logged Out', {
      position: 'top-center',
      theme: 'dark',
      autoClose: 1500
    })
    dispatch(removeToken(userToken));
    dispatch(clearProfile());
  }

  return (
    <>
      <nav className="navbar">
        <div className="navBrand" onClick={redirectToHome}>
          Blog
        </div>
        <ul className="navItems">
          {
            !userToken.length > 0 ? (
              <>
                <li className="navList"><NavLink to='/login'>Login</NavLink></li>
                <li className="navList"><NavLink to='/register'>Register</NavLink></li>
              </>
            ) : (
              <>
                <li className="navList"><NavLink onClick={handleLogout}>Logout</NavLink></li>
                <li className="navList"><NavLink to={'/create'}>Create Post</NavLink></li>
                <li className="navList">{userName}</li>
              </>
            )
          }
        </ul>
      </nav>
    </>
  )
}

export default Navbar
