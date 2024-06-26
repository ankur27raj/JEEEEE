const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/paymentModel.js");
require("dotenv").config();

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});

exports.checkout = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    order,
  });
};

exports.paymentVerification = async (req, res) => {
  // const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
  //   req.body;

  // const body = razorpay_order_id + "|" + razorpay_payment_id;

  // const expectedSignature = crypto
  //   .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
  //   .update(body.toString())
  //   .digest("hex");

  // const isAuthentic = expectedSignature === razorpay_signature;

  // if (isAuthentic) {
  //   // Database comes here
  //   console.log("hello");

  //   await Payment.create({
  //     razorpay_order_id,
  //     razorpay_payment_id,
  //     razorpay_signature,
  //   });

    res.redirect(
      `https://je-2-frontend.onrender.com`
    );
  // } else {
  //   res.status(400).json({
  //     success: false,
  //   });
  // }
};
