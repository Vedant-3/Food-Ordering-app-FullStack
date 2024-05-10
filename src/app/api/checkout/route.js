import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Order } from "@/models/Order";
import { MenuItem } from "@/models/MenuItem";
const stripe = require('stripe')(process.env.STRIPE_SK)

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const { cartProducts, address } = await req.json();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  const orderDoc = await Order.create({
    userEmail,
    ...address,
    cartProducts,
    paid: false,
  })

  const stripeLineItems = []
  for (const cartProduct of cartProducts) {
    const productName = cartProduct.name ;
    const productInfo = await MenuItem.findById(cartProduct._id);
    let produtPrice = productInfo.price ;
    if(cartProduct.size){
      const size = productInfo.sizes.find(size => size._id.toString() === cartProduct.size._id.toString());
      produtPrice += size.price ;
    }
    if(cartProduct.extras?.length > 0){
      for(const cartExtra of cartProduct.extras){
        const extraInfo = productInfo.extra.find(e => e._id.toString() === cartExtra._id.toString() );
        produtPrice += extraInfo.price ;
      }
    }


    stripeLineItems.push({
      quantity: 1,
      price_data: {
        currency: 'USD',
        product_data: {
          name: productName,
        },
        unit_amount: produtPrice * 100,
      }
    })
  }

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: 'payment',
    customer_email: userEmail,
    success_url: 'http://localhost:3000/orders/' + orderDoc._id.toString() + '?clear-cart=1',
    cancel_url: 'http://localhost:3000/cart?/cancel=1',
    metadata: { orderId: orderDoc._id.toString() },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery Fee",
          type: 'fixed_amount',
          fixed_amount: { amount: 500, currency: 'USD' }
        }
      }
    ]
  })
  return Response.json(stripeSession.url);

}