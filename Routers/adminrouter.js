const {Router} = require('express')
const route = Router()
const { login } = require('../Controllers/loginController')
const { Signup } = require('../Controllers/signupcontroller')

route.post('/login', login)
route.post('/signup',Signup)
module.exports = route
