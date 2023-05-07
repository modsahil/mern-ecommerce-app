import React, { useState, useEffect } from 'react'
import UserMenu from '../../components/Layout/UserMenu'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/Auth'
import axios from 'axios'

const Profile = () => {
    //Context
    const [auth, setAuth] = useAuth()


    //state
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')


    //get user data
    useEffect(() => {
        const {email, name, phone, address} = auth?.user
        setName(name)
        setPhone(phone)
        setAddress(address)
        setEmail(email)
    }, [auth?.user])

    //form function
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const {data} = await axios.put(`${import.meta.env.VITE_REACT_APP_API}/api/v1/auth/profile`, { name, email, password, phone, address })
            if(data?.error){
                alert(data?.error)
            }else{
                setAuth({...auth, user:data?.updatedUser})
                let ls = localStorage.getItem("auth")
                ls = JSON.parse(ls)
                ls.user = data.updatedUser
                localStorage.setItem('auth', JSON.stringify(ls))
                alert('Profile updated Successfully')
            }
        } catch (error) {
            console.log(error)

        }
    }


    return (
        <Layout>
            <div className="container-fluid p-3 m-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <div className='register form-container'>
                            <h4 className='title'>User Profile</h4>
                            <form onSubmit={handleSubmit} >
                                <div class="mb-3">

                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputName" placeholder='Enter Your Name'  />
                                </div>
                                <div class="mb-3">
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail" placeholder='Enter Your Email'  disabled />
                                </div>
                                <div className="mb-3">
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter Your Password'  />
                                </div>
                                <div class="mb-3">
                                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="exampleInputPhone" placeholder='Enter Your Phone No.'  />
                                </div>
                                <div class="mb-3">
                                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="exampleInputAddress" placeholder='Enter Your Address'  />
                                </div>
                                <button type="submit" className="btn btn-primary">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile