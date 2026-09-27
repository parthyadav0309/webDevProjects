const express = require('express')
const router = express.Router()

const controllers = require('../controllers')
const authenticateToken = require('../middlewares/jwt')

//auth routes
router.post('/login', controllers.login)

router.post('/login/otplogin', controllers.otpLogin)

router.post('/password', controllers.passwordLogin)

router.post('/signup', authenticateToken, controllers.createAccount)

router.post('/logout', authenticateToken, controllers.logout)

router.post('/forgot', controllers.forgetPassword)

router.post('/reset/:token', controllers.resetPassword)

//user data route
router.get('/profile', authenticateToken, controllers.profile)

router.patch('/edit-profile', authenticateToken, controllers.editProfile)

router.post('/addresses/new', authenticateToken, controllers.newAddress)

router.patch('/addresses/:id/update', authenticateToken, controllers.updateAddress)

router.delete('/addresses/:id/delete', authenticateToken, controllers.deleteAddress)

//products

router.get('/api/products/:category', controllers.getCategoryProducts)

router.get('/api/products/:category/:subcategory', controllers.getSubcategoryProducts)

router.get('/api/products/:category/:subcategory/:productType', controllers.getProductTypeProduct)

router.get('/api/products/:category/:subcategory/:productType/:productId', controllers.getProduct)

//wishlist and bag

router.get('/my/wishlist', authenticateToken, controllers.getWishlist)

router.get('/my/bag', authenticateToken, controllers.getBag)

router.post('/api/products/:productId/wishlist', authenticateToken, controllers.addToWishlist)

router.post('/api/products/:productId/bag', authenticateToken, controllers.addToBag)

router.use('*', controllers.notFound)

module.exports = router