import {User} from '../types/user';

export type UserOutput = {
  usernameErrorMessage?: string,
  emailErrorMessage?: string,
  passwordErrorMessage?: string,
  clean: boolean,
}

/**
 * Checks if the user input is valid
 * @param candidate A user object to be checked. `sanityCheck` will only check
 *  the `username`, `email`, and `password` fields.
 * @returns A list [errorMessage, clean] where `errorMessage` is a string that
 * describes the error, and `clean` is a boolean that is true if the user is
 * clean.
 */
export function sanityCheck(candidate: Partial<User>): [string, boolean] {

  let errorMessages: string[] = [];

  if (candidate.username && (candidate.username.length > 256 || candidate.username.length < 3)) {
    errorMessages.push('Username must be between 3 and 256 characters')
  }
  // TODO: ask team if this regest is what we agreed on
  if (candidate.username && !/^[a-zA-Z0-9_]+$/.test(candidate.username)) {
    errorMessages.push('Username must only contain letters, numbers, and underscores')
  }
  if (candidate.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(candidate.email)) {
    errorMessages.push('Invalid email address')
  }
  if (candidate.password && (candidate.password.length > 256 || candidate.password.length < 8)) {
    errorMessages.push('Password must be between 8 and 256 characters')
  }

  return [errorMessages.join('\n'), errorMessages.length === 0];
}