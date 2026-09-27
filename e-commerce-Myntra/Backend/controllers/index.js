const query = require('../dbHelper')
const { generateOtp } = require('../services/otp')
const redis = require('../redis')
const client = require('../services/messaging')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const sendEmail = require('../services/email')

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '5h' })
}

const generateForgetPasswordToken = (user) => {
    return jwt.sign(user, process.env.FORGET_PASSWORD_ACCESS_TOKEN, { expiresIn: '10h' })
}

const convertStringToArray = (string) => {
    return string.split('|')
}

module.exports.login = async (req, res, next) => {
    try {
        const { number } = req.body;
        const mobile = number;
        //check if user exists`
        const userData = await query.getUserDetails(mobile)
        if (!userData) {
            const err = new Error('Cannot fetch user details from database')
            return next(err)
        }
        let userId;
        if (userData.rows.length === 0) {
            //create user
            const newUserId = await query.createUser(mobile)
            userId = newUserId.rows[0].id
            res.status(201)
            //ok byeeeeeeee
        }
        //create otp and store in redis
        const otp = await generateOtp()
        const expiryTime = Date.now() + 1000 * 60 * 1000
        const redisKey = `${mobile}:${expiryTime}`
        await redis.set(redisKey, otp);
        //send otp to user
        await client.messages
            .create({
                body: `${otp} is your OTP to login to Myntra. DO NOT share with anyone. MYNTRA never calls to ask for OTP. The otp expires in 10 mins.\nPlease note that this message is just a part of our project to increase our technical skills. We do not intend to leak user information and harm your data privacy. It is just a demo project with the goal of implementing and showcasing our skills in an innovative way.
                `,
                to: `+91${mobile}`,
                from: process.env.TWILIO_PHONE,
            })

        res.json({
            "message": `otp successfully sent to ${mobile}`,
        })

    }
    catch (err) {
        next(err);
    }
}

module.exports.otpLogin = async (req, res, next) => {
    try {
        const { mobile, otp } = req.body;
        const userIdObject = await query.getUserDetails(mobile)
        if (!userIdObject) {
            const err = new Error('Cannot fetch user details from database')
            return next(err)
        }
        if (userIdObject.rows.length === 0) {
            const err = new Error('Mobile number not found in database')
            err.statusCode = 404
            return next(err)
        }
        let message;
        //fetch mobile from redis and match otp
        const allKeys = await redis.keys(`${mobile}:*`)
        for (let i = 0; i < allKeys.length; i++) {
            let value = await redis.get(allKeys[i])
            if (Number(value) === otp) {
                message = 'OTP verified.'
                break;
            }
        }
        if (!message) {
            const err = new Error('Invalid or expired otp')
            err.statusCode = 401
            return next(err)
        }
        let userId = userIdObject.rows[0].id
        const userData = { loginId: mobile, userId }
        const accessToken = generateAccessToken(userData)
        res.cookie('jwt', accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 //1 day expiration
        })
        res.json({ message })
    }
    //the coders of this code are doomed
    catch (err) {
        next(err)
    }
}

module.exports.passwordLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userIdObject = await query.getUserDetails(email)
        if (!userIdObject) {
            const err = new Error('Cannot fetch user details from database')
            return next(err)
        }
        if ((userIdObject.rows.length === 0)) {
            let message = 'Account does not exist'
            const err = new Error(message)
            err.statusCode = 400
            err.clientMessage = message
            return next(err)
        }
        if (!(await bcrypt.compare(password, userIdObject.rows[0].password))) {
            let message = 'Email and password does not match'
            const err = new Error(message)
            err.statusCode = 403
            err.clientMessage = message
            return next(err)
        }
        let userId = userIdObject.rows[0].id
        const userData = { loginId: email, userId }
        const accessToken = generateAccessToken(userData)
        res.cookie('jwt', accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 //1 day expiration
        })
        res.json({ "message": "Logged in successfully!" })
    }
    catch (err) {
        next(err)
    }
}

module.exports.createAccount = async (req, res, next) => {
    try {
        const { password, name, email, gender, number1, hintName, location, birthDate } = req.body;
        const { userId } = req.user
        const bcryptRounds = 10
        const hashedPassword = bcrypt.hashSync(password, bcryptRounds)
        await query.addNewUserDetails(userId, name, hashedPassword, email, gender, location, number1, hintName, birthDate);
        res.status(201).json({ "message": "User Sign up successful!" })
    }
    catch (err) {
        next(err)
    }
}

module.exports.forgetPassword = async (req, res, next) => {
    try {
        //email ya text kardo password reset link ko
        const { loginId } = req.body;
        const userIdObject = await query.getUserDetails(loginId)
        if (!userIdObject) {
            const err = new Error('Cannot fetch user details from database')
            return next(err)
        }
        if (userIdObject.rows.length === 0) {
            const message = 'Account does not exist'
            const err = new Error(message)
            err.clientMessage = message
            err.statusCode = 400
            return next(err)
        }
        //generate access token for the user
        const user = { loginId };
        const accessToken = generateForgetPasswordToken(user);
        console.log(accessToken)

        const tokenGenerationTime = Date.now()
        const tokenExpirationTime = new Date(tokenGenerationTime + 10 * (60 * 60 * 1000))
        const passwordResetLink = `http://localhost:3000/forget-password/${accessToken}`
        //send email/mobile with password reset link
        if (loginId.includes('@')) { //email
            const subject = 'Your Myntra account password'
            const body = `
            <body>
            <p>Dear customer,<br><br>
                We received a request to reset the password for your account. If you made this request, please click the following button:<br><br>
                <button><a href="${passwordResetLink}">Reset</a></button> <br><br>
                Or <br><br> Open the following link in your browser:<br><br><a href="${passwordResetLink}">${passwordResetLink}<a/>
            </p>
            <br><br>
            <p>The password reset link is valid till <strong>${tokenExpirationTime}<strong></p>
            <br>
            <p><strong>Please do not share this link with anyone.<strong></p>
            <br>
            <p>If you didn't raise this request, please ignore this email.</p>
            </body>`
            sendEmail(loginId, subject, body)
            res.json({ 'message': `Email sent successfully to ${loginId}` })
        }
        else { //mobile number
            await client.messages
                .create({
                    body: `Dear customer,\nWe received a request to reset the password for your account. If you made this request, open the following link in your browser: \n
                    ${passwordResetLink}\nThe password reset link is valid till ${tokenExpirationTime}. \nPlease do not share this link with anyone.            
                `,
                    to: `+91${loginId}`,
                    from: process.env.TWILIO_PHONE,
                })
            res.json({ 'message': `Password reset link successfully sent to ${loginId}` })
        }
    }
    catch (err) {
        console.log(err)
        next(err)
    }
}

module.exports.resetPassword = async (req, res, next) => {
    try {
        const { token } = req.params
        const { password } = req.body
        //validate the token
        let loginId;
        jwt.verify(token, process.env.FORGET_PASSWORD_ACCESS_TOKEN, async (err, user) => {
            if (err) {
                return res.status(403).json({ "message": "Invalid or expired token. Please login again." })
            }
            loginId = user.loginId
        })
        const bcryptRounds = 10
        const hashedPassword = bcrypt.hashSync(password, bcryptRounds)
        await query.resetPassword(loginId, hashedPassword)
        res.json({ 'message': 'Password reset successfully!' })
    }
    catch (err) {
        console.log(err)
        next(err)
    }
}

module.exports.logout = async (req, res, next) => {
    try {
        res.clearCookie("jwt");
        res.json({ "message": "Successfully logged out!" })
    }
    catch (err) {
        next(err)
    }
}

module.exports.newAddress = async (req, res, next) => {
    try {
        const { full_name, mobile, pincode, state, address, locality, city, typeOfAddress, isDefaultAddress, isOpenOnSaturday, isOpenOnSunday } = req.body
        const { userId } = req.user
        await query.addUserAddress(userId, full_name, mobile, pincode, state, address, locality, city, typeOfAddress, isDefaultAddress, isOpenOnSaturday, isOpenOnSunday)
        return res.status(201).json({ "message": "Address added successfully" })
    }
    catch (err) {
        next(err)
    }
}

module.exports.updateAddress = async (req, res, next) => {
    try {
        const { id } = req.params
        const { full_name, mobile, pincode, state, address, locality, city, typeOfAddress, isDefaultAddress, isOpenOnSaturday, isOpenOnSunday } = req.body
        await query.editUserAddress(id, full_name, mobile, pincode, state, address, locality, city, typeOfAddress, isDefaultAddress, isOpenOnSaturday, isOpenOnSunday)
        return res.status(201).json({ "message": "Address edited successfully" })
    }
    catch (err) {
        next(err)
    }
}

module.exports.deleteAddress = async (req, res, next) => {
    try {
        const { id } = req.params
        const currDate = new Date()
        await query.deleteAddress(currDate.toISOString(), id)
        res.json({ "message": "Address deleted successfully" })
    }
    catch (err) {
        next(err)
    }
}

module.exports.profile = async (req, res, next) => {
    try {
        const { loginId, userId } = req.user
        const [userObject, addressesObject] = await Promise.all([query.getUserDetails(loginId), query.getUserAddresses(userId)])
        const userDetails = { ...userObject.rows[0] }
        if (addressesObject.rows.length === 0) {
            userDetails.addresses = [];
        }
        else {
            userDetails.addresses = addressesObject.rows;
        }
        res.json({ "data": userDetails })
    }
    catch (err) {
        next(err)
    }
}

module.exports.editProfile = async (req, res, next) => {
    try {
        const { userId } = req.user
        const { full_name, email, gender, hint_name, alternate_mobile, birth_date, location } = req.body;
        await query.editProfile(userId, full_name, email, gender, hint_name, alternate_mobile, birth_date, location)
        res.json({ "message": "Edited profile successfully!" })
    }
    catch (err) {
        console.log(err)
        next(err)
    }
}

module.exports.getCategoryProducts = async (req, res, next) => {
    try {
        let { category } = req.params
        let { page = 1 } = req.query
        category = category.charAt(0).toUpperCase() + category.slice(1)
        const [productsObject, countObject] = await Promise.all([query.getCategoryProducts(category, page), query.countCategoryProducts(category)])
        const totalObjects = countObject.rows[0].count
        const allProducts = productsObject.rows
        for (let i = 0; i < allProducts.length; i++) {
            allProducts[i].details = allProducts[i].details && convertStringToArray(allProducts[i].details)
            allProducts[i].material_and_care = allProducts[i].material_and_care && convertStringToArray(allProducts[i].material_and_care)
            allProducts[i].size = allProducts[i].size && convertStringToArray(allProducts[i].size)
            allProducts[i].features = allProducts[i].features && convertStringToArray(allProducts[i].features)
            allProducts[i].size_fit = allProducts[i].size_fit && convertStringToArray(allProducts[i].size_fit)
            const imageObject = await query.getAllImages(allProducts[i].id)
            allProducts[i].images = []
            for (let j = 0; j < imageObject.rows.length; j++) {
                allProducts[i].images.push(imageObject.rows[j].image_link)
            }
        }
        const dataToSend = {
            "count": totalObjects,
            "page": page,
            "data": productsObject.rows
        }
        res.json(dataToSend)
    }
    catch (err) {
        next(err)
    }
}

module.exports.getSubcategoryProducts = async (req, res, next) => {
    try {
        let { category, subcategory } = req.params
        let { page = 1 } = req.query
        category = category.charAt(0).toUpperCase() + category.slice(1)
        subcategory = subcategory.split('_').join(' ')
        subcategory = subcategory.charAt(0).toUpperCase() + subcategory.slice(1)
        const [productsObject, countObject] = await Promise.all([query.getSubcategoryProducts(category, subcategory, page), query.countSubcategoryProducts(category, subcategory)])
        const totalObjects = countObject.rows[0].count
        const allProducts = productsObject.rows
        for (let i = 0; i < allProducts.length; i++) {
            allProducts[i].details = allProducts[i].details && convertStringToArray(allProducts[i].details)
            allProducts[i].material_and_care = allProducts[i].material_and_care && convertStringToArray(allProducts[i].material_and_care)
            allProducts[i].size = allProducts[i].size && convertStringToArray(allProducts[i].size)
            allProducts[i].features = allProducts[i].features && convertStringToArray(allProducts[i].features)
            allProducts[i].size_fit = allProducts[i].size_fit && convertStringToArray(allProducts[i].size_fit)
            const imageObject = await query.getAllImages(allProducts[i].id)
            allProducts[i].images = []
            for (let j = 0; j < imageObject.rows.length; j++) {
                allProducts[i].images.push(imageObject.rows[j].image_link)
            }
        }
        const dataToSend = {
            "count": totalObjects,
            "page": page,
            "data": productsObject.rows
        }
        res.json(dataToSend)
    }
    catch (err) {
        console.log(err)
        next(err)
    }
}

module.exports.getProductTypeProduct = async (req, res, next) => {
    try {
        let { page = 1 } = req.query
        let { category, subcategory, productType } = req.params
        category = category.charAt(0).toUpperCase() + category.slice(1)
        subcategory = subcategory.split('_').join(' ')
        subcategory = subcategory.charAt(0).toUpperCase() + subcategory.slice(1)
        productType = productType.split('_').join(' ')
        productType = productType.charAt(0).toUpperCase() + productType.slice(1)
        const [productsObject, countObject] = await Promise.all([query.getProductTypeProduct(category, subcategory, productType, page), query.countProductTypeProducts(category, subcategory, productType)])
        const totalObjects = countObject.rows[0].count
        const allProducts = productsObject.rows
        for (let i = 0; i < allProducts.length; i++) {
            allProducts[i].details = allProducts[i].details && convertStringToArray(allProducts[i].details)
            allProducts[i].material_and_care = allProducts[i].material_and_care && convertStringToArray(allProducts[i].material_and_care)
            allProducts[i].size = allProducts[i].size && convertStringToArray(allProducts[i].size)
            allProducts[i].features = allProducts[i].features && convertStringToArray(allProducts[i].features)
            allProducts[i].size_fit = allProducts[i].size_fit && convertStringToArray(allProducts[i].size_fit)
            const imageObject = await query.getAllImages(allProducts[i].id)
            allProducts[i].images = []
            for (let j = 0; j < imageObject.rows.length; j++) {
                allProducts[i].images.push(imageObject.rows[j].image_link)
            }
        }
        const dataToSend = {
            "count": totalObjects,
            "page": page,
            "data": productsObject.rows
        }
        res.json(dataToSend)
    }
    catch (err) {
        next(err)
    }
}

module.exports.getProduct = async (req, res, next) => {
    try {
        let { category, subcategory, productType, productId } = req.params
        category = category.charAt(0).toUpperCase() + category.slice(1)
        subcategory = subcategory.split('_').join(' ')
        subcategory = subcategory.charAt(0).toUpperCase() + subcategory.slice(1)
        productType = productType.split('_').join(' ')
        productType = productType.charAt(0).toUpperCase() + productType.slice(1)
        const [productsObject] = await Promise.all([query.getProduct(category, subcategory, productType, productId)])
        const product = productsObject.rows[0]
        product.details = product.details && convertStringToArray(product.details)
        product.material_and_care = product.material_and_care && convertStringToArray(product.material_and_care)
        product.size = product.size && convertStringToArray(product.size)
        product.features = product.features && convertStringToArray(product.features)
        product.size_fit = product.size_fit && convertStringToArray(product.size_fit)
        const imageObject = await query.getAllImages(product.id)
        product.images = []
        for (let j = 0; j < imageObject.rows.length; j++) {
            product.images.push(imageObject.rows[j].image_link)
        }
        const dataToSend = {
            "data": product
        }
        res.json(dataToSend)
    }
    catch (err) {
        next(err)
    }
}

module.exports.getWishlist = async (req, res, next) => {
    try {
        const { userId } = req.user
        const wishlistObject = await query.getWishlist(userId);
        const allProducts = wishlistObject.rows
        for (let i = 0; i < allProducts.length; i++) {
            allProducts[i].details = allProducts[i].details && convertStringToArray(allProducts[i].details)
            allProducts[i].material_and_care = allProducts[i].material_and_care && convertStringToArray(allProducts[i].material_and_care)
            allProducts[i].size = allProducts[i].size && convertStringToArray(allProducts[i].size)
            allProducts[i].features = allProducts[i].features && convertStringToArray(allProducts[i].features)
            allProducts[i].size_fit = allProducts[i].size_fit && convertStringToArray(allProducts[i].size_fit)
            const imageObject = await query.getAllImages(allProducts[i].id)
            allProducts[i].images = []
            for (let j = 0; j < imageObject.rows.length; j++) {
                allProducts[i].images.push(imageObject.rows[j].image_link)
            }
        }
        res.json(allProducts)
    }
    catch (err) {
        next(err)
    }
}

module.exports.getBag = async (req, res, next) => {
    try {
        const { userId } = req.user
        const userBagObject = await query.getUserBag(userId);
        const allProducts = userBagObject.rows
        for (let i = 0; i < allProducts.length; i++) {
            allProducts[i].details = allProducts[i].details && convertStringToArray(allProducts[i].details)
            allProducts[i].material_and_care = allProducts[i].material_and_care && convertStringToArray(allProducts[i].material_and_care)
            allProducts[i].size = allProducts[i].size && convertStringToArray(allProducts[i].size)
            allProducts[i].features = allProducts[i].features && convertStringToArray(allProducts[i].features)
            allProducts[i].size_fit = allProducts[i].size_fit && convertStringToArray(allProducts[i].size_fit)
            const imageObject = await query.getAllImages(allProducts[i].id)
            allProducts[i].images = []
            for (let j = 0; j < imageObject.rows.length; j++) {
                allProducts[i].images.push(imageObject.rows[j].image_link)
            }
        }
        res.json(allProducts)
    }
    catch (err) {
        next(err)
    }
}

module.exports.addToWishlist = async (req, res, next) => {
    try {
        const { userId } = req.user
        const { productId } = req.params
        await query.addToWishlist(userId, productId);
        res.status(201).json({ "message": "Added to wishlist!" })
    }
    catch (err) {
        next(err)
    }
}

module.exports.addToBag = async (req, res, next) => {
    try {
        const { userId } = req.user
        const { productId } = req.params
        const { size } = req.query
        await query.addToBag(userId, productId, size)
        res.status(201).json({ "message": "Added to bag!" })
    }
    catch (err) {
        next(err)
    }
}

module.exports.notFound = (req, res, next) => {
    const err = new Error(`Cannot ${req.method} ${req.path}`)
    err.statusCode = 404
    err.clientMessage = `Requested URL ${req.path} not found`
    next(err)
}