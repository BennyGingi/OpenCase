import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { buffer } from "micro";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const config = {
  api: {
    bodyParser: false, // Disable body parsing to handle raw body
  },
};

export async function POST(req: Request) {
  try {
    const buf = await buffer(req);
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      console.error('No signature');
      return new Response('No signature', { status: 400 });
    }

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err) {
      console.error('Error constructing event', err);
      return new Response('Error constructing event', { status: 400 });
    }

    console.log('Event type:', event.type);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const userEmail = session.customer_details?.email;

      if (!userEmail) {
        console.error('Missing user email');
        throw new Error('Missing user email');
      }

      const { userId, orderId } = session.metadata || {
        userId: null,
        orderId: null,
      };

      if (!userId || !orderId) {
        console.error('Invalid request metadata');
        throw new Error('Invalid request metadata');
      }

      const billingAddress = session.customer_details!.address;
      const shippingAddress = session.shipping_details!.address;

      console.log('Updating order:', orderId);

      try {
        await db.order.update({
          where: {
            id: orderId,
          },
          data: {
            isPaid: true,
            shippingAddress: {
              create: {
                name: session.customer_details!.name!,
                city: shippingAddress!.city!,
                country: shippingAddress!.country!,
                postalCode: shippingAddress!.postal_code!,
                street: shippingAddress!.line1!,
                state: shippingAddress!.state!,
              },
            },
            billingAddress: {
              create: {
                name: session.customer_details!.name!,
                city: billingAddress!.city!,
                country: billingAddress!.country!,
                postalCode: billingAddress!.postal_code!,
                street: billingAddress!.line1!,
                state: billingAddress!.state!,
              },
            },
          },
        });
      } catch (updateError) {
        console.error('Error updating order:', updateError);
        throw new Error('Error updating order');
      }
    }

    console.log('Webhook processed successfully');
    return NextResponse.json({ result: event, ok: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json(
      { message: "Something went terribly wrong!", ok: false },
      { status: 500 }
    );
  }
}
