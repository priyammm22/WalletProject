const express = require('express');
const { authMiddleware } = require('./middleware');
const { Account } = require('../db');

const { z, string, number } = require('zod');
const {  mongoose } = require('mongoose');

const router = express.Router();

router.get('/balance', authMiddleware, async (req, res) => {
    console.log('reaches at balance');
    const userid = req.userId;
    console.log(userid);
    try {
        const acc = await Account.findOne({
            userId: userid
        });
        console.log(acc.balance);
      return res.status(200).json({
            balance: acc.balance,
            success:true
        })
    }
    catch (e) {
        return res.status(411).json({
            message: "some error to load balance",
            success:false
        })
    }
})

const transderSchema = z.object({
    to: z.string(),
    amount:z.number()
})

router.post('/transfer', authMiddleware, async (req, res) => {

    const trnsBody = req.body;

    console.log(trnsBody);

    const session = await mongoose.startSession();
    
    const isValid = transderSchema.safeParse(trnsBody);
    if(!isValid.success) {
        return res.status(411).json({
            message:"Amount/key are not appropriate type",
            success:false
        });
    }
    
    const ourAcc = await Account.findOne({
        userId: req.userId
    })

    if (trnsBody.amount > ourAcc.balance) {
        return res.status(400).json({
            message: "Insufficiend balance",
            success:false
        })
    }

    const toUser = await Account.findOne({
        userId: trnsBody.to
    })
    if (!toUser) {
        return res.status(400).json({
            message: "Invalid account",
            success:false
        })
    }
    session.startTransaction();
    const amount = req.body.amount;

    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } })
    await Account.updateOne({ userId: toUser.userId }, { $inc: { balance: amount } })

    await session.commitTransaction();
    res.status(200).json({
        message: "Transfer successfull",
        success:true
    })
})

module.exports = router;