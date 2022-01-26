import {User} from '../types/user';

export function isValidName(name: string): [boolean, string] {
  const properLength = name.length > 3 && name.length < 256;
  const properCharacters = !/^[a-zA-Z0-9_]+$/.test(name);
  switch([properLength, properCharacters]) {
    case [true, true]:
      return [true, ''];
    case [true, false]:
      return [false, 'Username must contain only letters, numbers, and underscores'];
    case [false, true]:
      return [false, 'Username must be between 3 and 256 characters'];
    case [false, false]:
    default:
      return [false, 'Username must contain only letters, numbers, and underscores and be between 3 and 256 characters'];
  }
}

export function isValidEmail(email: string): [boolean, string] {
  const properLength = email.length > 3 && email.length < 256;
  const properCharacters = !/^[a-zA-Z0-9_@.]+$/.test(email);
  const emailFormat = /^[^@]+@[^@]+\.[^@]+$/.test(email);
  switch([properLength, properCharacters, emailFormat]) {
    case [true, true, true]:
      return [true, ''];
    case [true, true, false]:
      return [false, 'Email must be in the format: <username>@<domain>.<tld>'];
    case [true, false, true]:
      return [false, 'Email must contain only letters, numbers, underscores, and periods'];
    case [true, false, false]:
      return [false, 'Email must contain only letters, numbers, underscores, and periods and be in the format: <username>@<domain>.<tld>'];
    case [false, true, true]:
      return [false, 'Email must be between 3 and 256 characters'];
    case [false, true, false]:
      return [false, 'Email must be between 3 and 256 characters and be in the format: <username>@<domain>.<tld>'];
    case [false, false, true]:
      return [false, 'Email must be between 3 and 256 characters and contain only letters, numbers, underscores, and periods'];
    case [false, false, false]:
    default:
      return [false, 'Email must be between 3 and 256 characters, contain only letters, numbers, underscores, and periods, and be in the format: <username>@<domain>.<tld>'];
  }
}

export function isValidPassword(password: string): [boolean, string] {
  const properLength = password.length > 3 && password.length < 256;
  switch([properLength]) {
    case [true]:
      return [true, ''];
    case [false]:
    default:
      return [false, 'Password must be between 3 and 256 characters'];
  }
}