import express from "express";
import db from '@repo/db/client';

const app = express();
app.use(express.json());

app.post("/hdfcWebhook", async ({req, res}: any) => {


    interface PaymentInformation {
        token: string;
        userId: number;
        amount: number;
    }

    const paymentInformation: PaymentInformation = {
        token: req.body.token,
        userId : req.body.userId,
        amount: req.body.amount,
    }

    try {
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: paymentInformation.userId
                },
                data: {
                    amount: {
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
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
        res.status(411).json({
            message: "Payment failed"
        })
    }
})


app.listen(3003);