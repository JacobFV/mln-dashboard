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

let testAccount: nodemailer.TestAccount;
let transporter: nodemailer.Transporter;

async function createTestAccount() {
  testAccount = await nodemailer.createTestAccount();
  transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
}

export default async function sendVerfCode(email: string, name: string) {
  // generate verf code
  const code = crypto.randomInt(verfCodeLength).toString(36);

  // edit database
  /*await prisma.email.update({
    where: {
      email: email,
    },
    data: {
      verificationCode: code,
      verificationCodeSentOn: new Date(),
    },
  });*/

  const verfUrl = `${publicDomain}/verify?email=${encodeURIComponent(
    email
  )}&code=${code}`;

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
    <p>Your verification code is ${code}. Enter this code in our website ${publicDomain} or click <a href="${verfUrl}">this</a> link to activate your ${appname} account.</p>
    <p>If you have any questions, send us an email at ${supportEmail}.</p>
    <p>Welcome aboard!<br/>The ${appname} team</p>
    </div>`;

  if (!transporter) {
    await createTestAccount();
  }

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"${appname}" <${noreplyEmail}>`, // sender address
    to: email, // list of receivers
    subject: "Please verify your email address", // Subject line
    text: message, // plain text body
    html: htmlMessage, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}
