import React, { useEffect, useState } from 'react'
import '../Styles/Navbar.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CgProfile } from "react-icons/cg";
import { IoMdCreate, IoIosLogOut } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { removeToken } from '../Features/Auth.Slice'
import { clearProfile } from '../Features/VerifiedUser.Slice'
import { useSelector, useDispatch } from 'react-redux'

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userToken = useSelector((state) => state.Authentication);
  const verifiedData = useSelector((state) => state.VerifiedUser);

  const userName = verifiedData && verifiedData.userName;

  const redirectToHome = () => {
    navigate('/');
  }

  const handleNavbar = () => {
    setNavbar(!navbar);
  }

  const handleLogout = () => {
    toast.success('Logged Out', {
      position: 'top-center',
      theme: 'dark',
      autoClose: 1500
    })
    dispatch(removeToken(userToken));
    dispatch(clearProfile());
    setNavbar(false)
  }

  return (
    <>
      <nav className="navbar">
        <div className="navBrand" onClick={redirectToHome}>
          Blog
        </div>
        <ul className={navbar? "navItems active": "navItems"}>
          {
            !userToken.length > 0 ? (
              <>
                <li className="navList"><NavLink to='/login' onClick={() => setNavbar(false)}>Login</NavLink></li>
                <li className="navList"><NavLink to='/register' onClick={() => setNavbar(false)}>Register</NavLink></li>
              </>
            ) : (
              <>
                <li className="navList"><NavLink onClick={handleLogout}><IoIosLogOut /> Logout</NavLink></li>
                <li className="navList"><NavLink to={'/create'} onClick={() => setNavbar(false)}><IoMdCreate /> Create Post</NavLink></li>
                <li className="navList"><NavLink to={'/'} onClick={() => setNavbar(false)}><CgProfile /> {userName}</NavLink></li>
              </>
            )
          }
        </ul>
        <div className={navbar? "menu rotateMenu": "menu"} onClick={handleNavbar}>
          <FaArrowLeft />
        </div>
      </nav>
    </>
  )
}

export default Navbar
