import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { braintreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFiltersController, productListController, productPhotoController, relatedProductController, serachController, updateProductController } from '../controllers/productController.js'
import formidable from 'express-formidable'

const router = express.Router()

  //routes
  //create Product
  router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

   //update Product
   router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController)

  //get Products
  router.get('/get-product', getProductController)

  //single Product
  router.get('/get-product/:slug', getSingleProductController)

  //get Photo
  router.get('/product-photo/:pid', productPhotoController)

  //delete Product
  router.delete('/delete-product/:pid', deleteProductController)

  //filter Product
  router.post('/product-filters', productFiltersController)

  //product count
  router.get('/product-count', productCountController)

  //product per page
  router.get('/product-list/:page', productListController)

  //search
  router.get('/search/:keyword', serachController)

  //similar products
  router.get('/related-product/:pid/:cid',  relatedProductController)

  //Category wise PRoduct
  router.get('/product-category/:slug', productCategoryController)

  //payment routes
  //token
  router.get('/braintree/token', braintreeTokenController)

  //payments
  router.post('/braintree/payment', requireSignIn, braintreePaymentController)



export default router