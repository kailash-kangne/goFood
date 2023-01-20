const express = require('express');
const router = express.Router();
const User = require('../models/User');

const { body, validationResult } = require('express-validator');

const  jwt = require('jsonwebtoken');
const  jwtSecret = "hareramharekrishna"

const bcrypt = require('bcryptjs');

router.post('/createuser',
    // username must be an email
    [body('email').isEmail(),
    // password must be at least 5 chars long
    body('password', "incorrect password").isLength({ min: 5 })],
    async (req, res) => {

        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password,salt)

        try {
            await User.create({
                // name: "kailu",
                // password: "2223",
                // email: "kailu@gmail.com",
                // location: "mum"

                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true })
        }
        catch (error) {
            console.error(error)
            res.json({ success: false })
        }
    })

router.post('/loginuser',
    // username must be an email
    [body('email').isEmail(),
    // password must be at least 5 chars long
    body('password', "incorrect password").isLength({ min: 5 })],
    async (req, res) => {
        //console.log("___________")
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email;
        let password = req.body.password;

         try {
            let userData = await User.findOne({email});
            //console.log(userData);
            if (!userData) {
                return res.status(400).json({ errors: "try logging with correct credentials" })
            }

            const pwdCompare = await bcrypt.compare(req.body.password,userData.password)

            if (!pwdCompare) {
                return res.status(400).json({ errors: "try logging with correct credentials" })
            }

            const data ={
                user:{
                    id:userData.id,
                }
            }

            const authToken = jwt.sign(data,jwtSecret)

            return res.json({ success: true, authToken: authToken })
        }
        catch (error) {
            console.error(error)
        }
    })

module.exports = router;