import express from "express";
import db from '@repo/db/client';

const app = express();
app.use(express.json());

app.post("/hdfcWebhook", async (req,res) => {
    interface PaymentInformation {
        token: string;
        userId: string;
        amount: string;
    }

   
    const paymentInformation: PaymentInformation = {
        token: req.body.token,
        userId : req.body.userId,
        amount: req.body.amount,
    }


    try {
        await db.$transaction([
            db.balance.update({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.update({
                where: {
                    token: paymentInformation.token
                },
                data:{
                    status: 'SUCCESS'
                }
            })
        ]);
        res.status(200).json({
            message: "Payment successful"
        })
    } catch (error) {
        console.error(error);
        db.onRampTransaction.update({
            where: {
                token: paymentInformation.token
            },
            data: {
                status: "FAILED"
            }
        })
        res.status(411).json({
            message: "Payment failed"
        })
    }
})


app.listen(3003);