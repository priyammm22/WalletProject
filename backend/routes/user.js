const express = require('express');
const { userValidation, updateBody } = require('./validationZod');
const router = express.Router();               
const SECRET_KEY = require('../config');                  
const { User, Account } = require('../db');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require("./middleware");
const zod = require('zod');

router.post('/Signup', async function (req, res) {
    const userData = req.body;
    // console.log(userData);
    const isValid = userValidation.safeParse(userData);
    if (!(isValid.success)) {
        // console.log(isValid);
        console.log(isValid.error.issues[0].message);
        console.log(isValid.error.issues[0].path[0]);
        // console.log(isValid.success);
         let message  =isValid.error.issues[0].path[0]+':'+isValid.error.issues[0].message;
        // console.log("zod error");
        return res.json({
            message:message,
            success: false
        })

    }

    const existingUser = await User.findOne({
        username: userData.username
    })

    if (existingUser) {
        console.log("user already exist")
        return res.status(411).json({
            message: "Email is already taken",
            success: false
        })
    }

    const dbuser = await User.create(userData);

    const userId = dbuser._id;
    /// ------- Creating new Account for this new user
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    // -- created account for user and assign random money [1 - 10000] 
    const token = jwt.sign({
        userId
    }, SECRET_KEY)
    res.json({
        message: "user created successfully",
        token: token,
        success: true,
        name: userData.firstName

    })

})



router.post('/signin', async (req, res) => {
    console.log("reachers at signin");
    const credentials = req.body
  console.log(credentials);
    const isValid = userValidation.pick({ username: true, password: true }).safeParse(credentials);
    
    if (!isValid.success) {
 
        return res.status(403).json({
            message:isValid.error.issues[0].message,
            success:false
        })
    }

    const existingUser = await User.findOne({
        username:credentials.username,
        password:credentials.password
    });

    console.log(existingUser);
    if (existingUser) {
        const token = jwt.sign({
            userId:existingUser._id
        }, SECRET_KEY);

        return res.status(200).json({
            token:token,
            success:true,
            name:existingUser.firstName
        })

    }
    else {
        console.log("else m hu")
         return  res.status(200).json({
            message:"this user not exist",
            success:false
        })
    }

})


router.put('/update', authMiddleware,async (req, res) => {
    const { success } = updateBody.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            message: "Error while updating information"
        });
    }

    try {
        await User.updateOne({ _id: req.userId }, req.body);
        return res.json({
            message: "Data updated successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

router.get('/bulk', authMiddleware, async (req, res) => {
    console.log("rechese here");
    const filter = req.query.filter || "";
    console.log("filter=>" + filter);
    const users = await User.find({
        $or: [
            {
                firstName: { '$regex': filter }
            },
            {
                lastName: { '$regex': filter }
            }
        ]
    });

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
});
module.exports = router;