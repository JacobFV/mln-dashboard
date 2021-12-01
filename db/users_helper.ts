import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
//import nodemailer from 'nodemailer';
const nodemailer = require('nodemailer');

import {User} from '../common/types/user'
import appinfo from '../common/misc/appInfo';


class UsersHelper {

  private users: {[uid: string]: User} = this.load()
  private lastSave: number = Date.now()

  // https://nodemailer.com/about/
  private emailAccount = await nodemailer.createTestAccount(); // change to real account on deploy
  private transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: this.emailAccount.user, // generated ethereal user
      pass: this.emailAccount.pass, // generated ethereal password
    },
  });

  /**
   * Ensures that a username is unique (not already taken).
   *
   * @param {String} username - candidate username of the user
   * @returns {boolean} - True if the username is unique, false otherwise.
   */
  usernameUnique(username: string): boolean {
    return Object.values(this.users).some(user => user.username === username)
  }

  /**
   * Ensures that an email is unique (not already taken).
   *
   * @param {String} email - candidate email of the user
   * @returns {boolean} - True if the email is unique, false otherwise.
   */
  emailUnique(email: string): boolean {
    return Object.values(this.users).some(user => user.email === email)
  }

  /**
   * Creates a new user in the database.
   * This method assumes you have already ensured that the username and email are unique.
   * This method also sends a verification email to the user.
   *
   * @param {object} user - object containing {username, email, password}
   * @returns {boolean} - True if the operation succeeded, raises an error otherwise.
   */
  create(user: Partial<User>): boolean {
    // generate unique user id
    let uid: string;
    do {
      uid = 'u-' + Math.floor(Math.random() * 1000000000)
    } while (this.users[uid])

    // add and save user
    this.users[uid] = {
      uid: uid,
      username: user.username!,
      email: user.email!,
      password: user.password!,
      hash: this.hash(user.password!),
      dateCreated: new Date().toISOString(),
      dateLastLogin: undefined,
      verificationCode: undefined,
      verified: false,
      dateVerified: undefined,
      deleted: false
    })
    this.sendVerificationCode(uid, user.username!, user.email!)

    this.save()
    return true;
  }

  /**
   * Sends a verification email to the user.
   *
   * @param {string} uid - user id
   * @param {string} username - username
   * @param {string} email - email to send verification code to
   * @returns {boolean} - True if the operation succeeded, raises an error otherwise.
   */
  sendVerificationCode(uid: string, username: string, email: string): string {
    const user = this.users[uid]
    if (!user) {
      throw new Error('User not found')
    }
    if (user.verified) {
      throw new Error('User already verified')
    }

    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const code = [...Array(5)]
      .map((_) => charset[Math.floor(Math.random() * charset.length)])
      .join("");

    const textMessage =
      `Hello ${username},\n\n` +
      `Your verification code is: "${code}".\n\n` +
      `Please enter this code in ${appinfo.name} to verify your email.`
    const htmlMessage =
      `<p>Hello ${username},</p>
      <p>Your verification code is: "${code}".</p>
      <p>
        Please enter this code in ${appinfo.name} to verify your email or simply click the link below.
        <form style="display: none" action="${appinfo.baseurl}/api/user/verify" method="post">
          <input type="hidden" name="uid" value="${uid}" />
          <input type="hidden" name="code" value="${code}" />
          <button type="submit" id="button_to_link"> </button>
        </form>
        <label style="text-decoration: underline" for="button_to_link">verify</label>
      </p>`

    const info = await this.transporter.sendMail({
      from: `"${appinfo.name}" <verification@${appinfo.publicDomain}>`,
      to: email,
      subject: `${appinfo.name} verification code: ${code}`, // Subject line
      text: textMessage, // plain text body
      html: htmlMessage, // html body
    });

    console.log("Message sent: %s", info.messageId);

    user.verificationCode = code
    user.dateVerified = undefined
    user.verified = false

    this.save()
    return true
  }

  // TODO: implement the special methods below
  //        also find a way to unify the initial email set and changeEmail
  //        as well as the initial password set and password change
  //        make this class fully contained (i.e.: public facing methods don't 
  //        assume anything about whether an email is valid, etc.)

  /**
   * Update specific fields of a user.
   *
   * Do not use this method to update the following special fields:
   * - uid: immutable. handled by createUser
   * - email: use changeEmail instead
   * - password: use setPassword instead
   * - hash: handled by setPassword
   * - dateCreated: immutable. handled by createUser
   * - dateLastLogin: handled by authenticate
   * - verificationCode: handled by sendVerificationCode
   * Those fields are managed by other methods in this class.
   *
   * @param uid 
   * @param key 
   * @param newVal 
   * @returns 
   */
  update(uid: string, key: string, newVal: boolean): boolean {

    // keep me from doing anything stupid
    // TODO include all the fields in the list above
    if (['uid', 'password', 'hash'].includes(key)) {
      throw new Error(`Cannot update the ${key} of a user.`)
    }

    // update the user
    Object.assign(this.users[uid], {[key]: newVal})

    this.save()
    return true;
  }

  authenticate(email: string, password: string): User|undefined {
    const user = Object.values(this.users).find(user => user.email === email)

    if (!user) {
      return undefined
    }

    return user.hash === this.hash(password) ? user : undefined
  }

  private hash(password: string): string {
    console.log(password, bcrypt.hashSync(`${password}${process.env.PSW_SALT}`, 10))
    return bcrypt.hashSync(password, 10)
  }

  private load(): {[uid: string]: User} {
    const data = fs.readFileSync(path.resolve('db/users.json'), 'utf-8')
    return JSON.parse(data)
  }

  private save() {
    // only actually write to the disk if 5 seconds have passed
    // this may be unnecessary, since most OS's manage a file cache
    // TODO: run experiments to see if this is necessary
    if (Date.now() - this.lastSave > 5000) {
      fs.writeFileSync(path.resolve('db/users.json'),
        JSON.stringify(this.users, null, 4))
      this.lastSave = Date.now()
    }
  }
}

const usersHelper = new UsersHelper()
export default usersHelper