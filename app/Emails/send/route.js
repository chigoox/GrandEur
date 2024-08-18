
import EmailOrderSuccessful from '@/app/Componets/emails/EmailOrderSuccessful';
import { siteName } from '@/app/META';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {

    let Data = await request.json();
    const {shippinginfo, email, subject, JSXBody, emailData, orderID} = Data
    try {
    const data = await resend.emails.send({
      from: `${siteName} <Vihair@resend.dev>`,
      to: [`${email}`],
      subject: subject,
      react: JSXBody =='EmailOrderSuccessful' ? EmailOrderSuccessful({ shippinginfo: shippinginfo, emailData:emailData, orderID: orderID}) : (<div>{fail}</div>),
    });

    console.log(data)

    return NextResponse.json(data);
  } catch (error) {
    console.log(error.message)
    return NextResponse.json({ error });
  }
}
