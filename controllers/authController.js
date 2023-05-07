import { comparePassword, hashPassword } from "../helpers/authHelper.js"
import userModels from "../models/userModels.js"
import orderModel from "../models/orderModel.js"
import JWT from "jsonwebtoken"

//post register
export const registerController = async (req, res) => {
    try {
        const { name, email, phone, address, password, answer } = req.body
        //validations
        if (!name) {
            return res.send({ message: 'Name is required' })
        }
        if (!email) {
            return res.send({ message: 'Email is required' })
        }
        if (!phone) {
            return res.send({ message: 'Phone is required' })
        }
        if (!password) {
            return res.send({ message: 'password is required' })
        }
        if (!address) {
            return res.send({ message: 'Address is required' })
        }
        if (!answer) {
            return res.send({ message: 'answer is required' })
        }


        const existingUser = await userModels.findOne({ email })
        //existing user
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'Already registered please login',
            })
        }

        //register user
        const hashedPassword = await hashPassword(password)
        //save 
        const user = await new userModels({ name, email, phone, address, password: hashedPassword, answer }).save()

        res.status(201).send({
            success: true,
            message: 'User Register Succesfully',
            user
        })


    } catch (error) {
        // console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error
        })
    }
}

//POST LOGIN
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body

        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password'
            })
        }
        const user = await userModels.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not registered'
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'Invalid password'
            })
        }
        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.status(200).send({
            success: true,
            message: 'Login Succesfully',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        })
    }
}

//Forgot PASSWOED METHOD POST

export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body
        if (!email) {
            res.status(400).send({ message: "Email is Required" })
        }
        if (!answer) {
            res.status(400).send({ message: "answer is Required" })
        }
        if (!newPassword) {
            res.status(400).send({ message: "newPassword is Required" })
        }
        //check
        const user = await userModels.findOne({ email, answer })
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Wrong Email or Password',
            })
        }
        const hashed = await hashPassword(newPassword)
        await userModels.findByIdAndUpdate(user._id, { password: hashed })
        res.status(200).send({
            success: true,
            message: 'Password Reset Successfully'
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Something Went Wrong",
            error
        })
    }
}

//Update Profile

export const updateProfileController = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body
        const user = await userModels.findById(req.user._id)

        //password
        if (password && password.length < 6) {
            return res.json({ error: 'Password is required and 6 character long' })
        }

        const hashedPassword = password ? await hashPassword(password) : undefined

        const updatedUser = await userModels.findByIdAndUpdate(req.user._id, {
            name : name || user.name,
            password : hashedPassword || user.password,
            phone: phone || user.phone,
            address : address || user.address,
       }, { new: true })

       res.status(200).send({
        success:true,
        message:'Profile UPdated Successfully',
        updatedUser,
       })


    }catch (error) {
    console.log(error)
    res.status(400).send({
        success: false,
        message: 'Something Went Wrong in Update profile',
        error
    })
}
}


//Orders

export const getOrdersController = async(req,res) => {
    try {
        const orders = await orderModel.find({buyer:req.user._id}).populate('products','-photo').populate('buyer','name')
        res.json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Something Went Wrong in Orders',
            error,
        })
    }
}



//All Orders

export const getAllOrdersController = async(req,res) => {
    try {
        const orders = await orderModel.find({}).populate('products','-photo').populate('buyer','name').sort({createdAt: '-1'})
        res.json(orders)
    } catch (error) {
        // console.log(error)
        res.status(500).send({
            success:false,
            message:'Something Went Wrong in All Orders',
            error
        })
    }
}


//Order Status

export const orderStatusController = async(req,res) => {
    try {
        const {orderId} = req.params
        const {status} = req.body
        const orders = await orderModel.findByIdAndUpdate(orderId, {status},{new:true})
        res.json(orders)
    } catch (error) {
        // console.log(error)
        res.status(500).send({
            success:true,
            message:'Something Went Wrong in Order Status',
            error
        })
    }
}





// get test 
export const testController = async (req, res) => {
    res.send("Protected Routes")
}