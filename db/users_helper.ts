// some code from: https://jasonwatmore.com/post/2021/08/28/next-js-read-write-data-to-json-files-as-the-database
const fs = require('fs')
const path = require('path')
const bcrypt = require('bcryptjs');

import {User} from '../common/types/user'


class UsersHelper {
  users: User[] = JSON.parse(fs.readFileSync(path.resolve('db/users.json')).toString())

  getAll(): User[] {
    return this.users
  }

  getById(id: number): User|undefined {
    return this.users.find(user => user.id === id)
  }

  getByUsername(name: string): User|undefined {
    return this.users.find(user => user.username === name)
  }

  getByEmail(email: string): User|undefined {
    return this.users.find(user => user.email === email)
  }

  getByUser(user: User): User|undefined {
    return this.users.find(u => u.toString() === user.toString())
  }

  /**
   * Creates a new user in the database
   * @param user object containing {username, email, UNHASHED password}
   * @returns the full user object or undefined if the operation failed
   */
  create(user: Partial<User>): User|undefined {
    // generate new user id
    user.id = this.users.length ? Math.max(...this.users.map((u: User) => u.id)) + 1 : 1

    // uniqueness checks
    if (usersHelper.getByUsername(user.username!) || usersHelper.getByEmail(user.email!)) {
      // I combined both uniqueness checks to reveal as little information as possible
      throw new Error(`User with name: ${user.username} or ${user.email} already exists`);
      return undefined
    }

    // hash password
    user.password = this.hash(user.password!)

    // set date created and updated
    user.dateCreated = new Date().toISOString()
    user.dateUpdated = new Date().toISOString()

    // add and save user
    this.users.push(user as User)
    this.saveData()

    return user as User;
  }

  update(id: number, params: object): boolean {
    const user = this.getById(id)

    if (!user) {
      throw new Error(`User with id: ${id} not found`)
    }

    // set date updated
    user.dateUpdated = new Date().toISOString()

    // update and save
    Object.assign(user, params)
    this.saveData()

    return true;
  }

  delete(id: number): boolean {
    // I don't actually delete the user to keep id's unique

    const user = this.getById(id)

    if (!user) {
      throw new Error(`User with id: ${id} not found`)
    }

    // delete and save
    user.deleted = true
    this.saveData()

    return true
  }

  saveData() {
    fs.writeFileSync(path.resolve('db/users.json'), JSON.stringify(this.users, null, 4))
  }

  authenticate(email: string, password: string): User|undefined {
    const user = this.getByEmail(email)

    if (!user) {
      return undefined
    }

    return user.password === this.hash(password) ? user : undefined
  }

  hash(password: string): string {
    console.log(password, bcrypt.hashSync(`${password}${process.env.PSW_SALT}`, 10))
    return bcrypt.hashSync(password, 10)
  }
}

const usersHelper = new UsersHelper()
export default usersHelper