import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm'
import {Modal} from 'antd'

const CreateCategory = () => {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState(null)
  const [updatedName, setUpdatedName] = useState('')

  //handle form
  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/category/create-category`, {name})
      if(data?.success){
        alert(`${name} is created`)
        allGetCategories()
      }else{
        alert(data.message)
      }
      
    } catch (error) {
      console.log(error)
      alert('Something Went Wrong in Error Form ')
    }
  }

  //get all categories
  const allGetCategories = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/category/get-category`)
      if (data?.success) {
        setCategories(data?.category)
      }
    } catch (error) {
      console.log(error)
      alert('Something went wrong in getting category')
    }
  }

  useEffect(() => { 
    allGetCategories()
  }, [])


  //Handle Update
  const handleUpdate = async(e) => {
    e.preventDefault()
    try {
      const {data} = await axios.put(`${import.meta.env.VITE_REACT_APP_API}/api/v1/category/update-category/${selected._id}`, {name:updatedName})
      if(data.success){
        alert(`${updatedName} is Updated`)
        setSelected(null)
        setUpdatedName('')
        setVisible(false)
        allGetCategories()


      }else{
        alert(data.message)
      }
    } catch (error){
      alert('Something Went Wrong')
    }
  }



  //Delete Category
  const handleDelete = async(pId) => {
    try {
      const {data} = await axios.delete(`${import.meta.env.VITE_REACT_APP_API}/api/v1/category/delete-category/${pId}`,)
      if(data.success){
        alert('Category is Deleted')
        allGetCategories()


      }else{
        alert(data.message)
      }
    } catch (error){
      alert('Something Went Wrong')
    }
  }

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3">
              <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
            </div>
            <div className='w-75'>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>

                  {categories.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td><button className="btn btn-primary ms-2" onClick={() => {setVisible(true); setUpdatedName(c.name); setSelected(c)}}>Edit</button></td>
                        <td><button className="btn btn-danger ms-2" onClick={() => {handleDelete(c._id)}}>Delete</button></td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
            <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
          </Modal>
        </div>
      </div>
    </Layout>
  )
}

export default CreateCategory