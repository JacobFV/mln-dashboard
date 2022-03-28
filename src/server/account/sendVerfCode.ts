import nodemailer from "nodemailer";
import crypto from "crypto";
import prisma from "../../prisma/prisma";
import {
  appname,
  noreplyEmail,
  publicDomain,
  supportEmail,
  verfCodeAlphabet,
  verfCodeLength,
} from "../../common/constants";

// get a instance of sendgrid and set the API key
import sendgrid from '@sendgrid/mail';
sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);

export default async function sendVerfCode(sendVerfCodeInput: {
  email: string, 
  name: string
}) {
  // unpack input
  const { email, name } = sendVerfCodeInput;

  // generate verf code
  const code = crypto.randomInt(verfCodeLength).toString(36);

  // edit database
  await prisma.email.update({
    where: {
      email: email,
    },
    data: {
      verificationCode: code,
      verificationCodeSentOn: new Date(),
    },
  });

  const verfUrl = `${publicDomain}/verify?email=${encodeURIComponent(email)}&code=${code}`;

  // make message
  const message = `Hi ${name}!

Thanks for getting started with ${appname}. We're glad you're here!

Your verification code is ${code}.

Enter this code in our website ${publicDomain} or click the following link to activate your ${appname} account:
${verfUrl}

If you have any questions, send us an email at ${supportEmail}.

Welcome aboard!
The ${appname} team`;

  const htmlMessage = `
    <div style="font-family: sans-serif;">
    <p>Hi ${name}!</p>
    <p>Thanks for getting started with ${appname}. We're glad you're here!</p>
    <p>Your verification code is <b><pre>${code}</pre></b>. Enter this code in our website ${publicDomain} or click <a href="${verfUrl}">this</a> link to activate your ${appname} account.</p>
    <p>If you have any questions, send us an email at ${supportEmail}.</p>
    <p>Welcome aboard!<br/>The ${appname} team</p>
    </div>`;
  
  console.log('sending email to ' + email);
  console.log('message: ' + message);
  // send the email via sendgrid
  sendgrid.send({
    from: process.env.VERIFIED_SENDGRID_EMAIL!, // sender address
    to: email, // list of receivers
    subject: "Please verify your email address", // Subject line
    text: message, // plain text body
    html: htmlMessage, // html body
  })
  console.log('email sent');
}
