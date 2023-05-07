import express from 'express'
import {registerController, loginController, testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController} from '../controllers/authController.js'
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js'

//router object
const router = express.Router()

//routing
//REGISTER || METHOD POST
router.post('/register', registerController)

//LOGIN || METHOD POST
router.post('/login', loginController)

//FORGOT PASSWORD || METHOD POST
router.post('/forgot-password', forgotPasswordController)

//test
router.get('/test', requireSignIn, isAdmin, testController)

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
  });

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//Update Profile 
router.put('/profile', requireSignIn, updateProfileController)

//Orders
router.get('/orders', requireSignIn, getOrdersController)

//All Orders
router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersController)

//Order status update
router.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatusController)

export default router