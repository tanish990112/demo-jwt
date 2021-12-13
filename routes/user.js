const express = require('express');
const router =  express.Router();
const users  =require('../contollers/userControllers')

router.route('/register')
        .post(users.SignUp)

router.route('/login')
        .post(users.Login)

router.route('/quote') 
        .get(users.quoteRender)
        .post(users.Quote)


module.exports =router;