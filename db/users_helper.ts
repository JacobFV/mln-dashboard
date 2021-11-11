// some code from: https://jasonwatmore.com/post/2021/08/28/next-js-read-write-data-to-json-files-as-the-database
const fs = require('fs')
const path = require('path')
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
   * @param user object containing {username, email, password}
   * @returns boolean indicating if the operation was successful
   */
  create(user: Partial<User>): boolean {
    // generate new user id
    user.id = this.users.length ? Math.max(...this.users.map((u: User) => u.id)) + 1 : 1

    // uniqueness checks
    if (this.getByUsername(user.username!)) {
      throw new Error(`User with name: ${user.username} already exists`)
    }
    if (this.getByEmail(user.email!)) {
      throw new Error(`User with email: ${user.email} already exists`)
    }

    // set date created and updated
    user.dateCreated = new Date().toISOString()
    user.dateUpdated = new Date().toISOString()

    // add and save user
    this.users.push(user as User)
    this.saveData()

    return true;
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
    const user = this.getById(id)

    if (!user) {
      throw new Error(`User with id: ${id} not found`)
    }

    // remove and save
    this.users = this.users.filter(user => user.id.toString() !== id.toString())
    this.saveData()

    return true
  }

  saveData() {
    fs.writeFileSync(path.resolve('db/users.json'), JSON.stringify(this.users, null, 4))
  }
}

const usersHelper = new UsersHelper()
export default usersHelper