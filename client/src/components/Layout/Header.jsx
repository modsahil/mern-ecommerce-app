import React from 'react'
import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../../context/Auth';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/Cart';
import { Badge } from 'antd'
import '../../styles/HeaderStyles.css'


const Header = () => {
  const [auth, setAuth] = useAuth()
  const [cart] = useCart()
  const categories = useCategory()
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: '',
    })
    localStorage.removeItem('auth')
    alert('Logout Sucessfully')
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to={'/'} className="navbar-brand" href="#">SRJ STORE</Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <NavLink to={'/'} className="nav-link active" aria-current="page" >Home</NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {
                !auth.user ? (<>
                  <li className="nav-item">
                    <NavLink to={'/register'} className="nav-link active" aria-current="page" >Register</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to={'/login'} className="nav-link active" aria-current="page" >Login</NavLink>
                  </li>
                </>) : (<>

                  <li className="nav-item dropdown">
                    <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li><NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item">Dashboard</NavLink></li>
                      <li><NavLink to={'/login'} onClick={handleLogout} className="dropdown-item" aria-current="page" >Logout</NavLink></li>
                    </ul>
                  </li>

                  <li className="nav-item">

                  </li>
                </>)
              }
              <li className="nav-item">
                <Badge count={cart?.length} showZero>
                  <NavLink to={'/cart'} className="nav-link active" aria-current="page" >Cart</NavLink>
                </Badge>

              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header