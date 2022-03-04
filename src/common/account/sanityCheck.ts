export function isValidName(name: string): [boolean, string] {
  const properLength = name.length > 3 && name.length < 256;
  const properCharacters = /^[a-zA-Z0-9_]+$/.test(name);
  if (properLength && properCharacters) {
    return [true, ""];
  } else if (!properLength && properCharacters) {
    return [false, "Name must be between 3 and 256 characters long"];
  } else if (properLength && !properCharacters) {
    return [
      false,
      "Name must only contain alphanumeric characters or underscores",
    ];
  } else {
    return [
      false,
      "Name must only contain letters, numbers, and underscores and be between 3 and 256 characters",
    ];
  }
}

export function isValidEmail(email: string): [boolean, string] {
  const properLength = email.length > 3 && email.length < 256;
  const properCharacters = /^[a-zA-Z0-9_@.]+$/.test(email);
  const emailFormat = /^[^@]+@[^@]+\.[^@]+$/.test(email);
  // switch([properLength, properCharacters, emailFormat]) {
  //   case [true, true, true]:
  //     return [true, ''];
  //   case [false, true, true]:
  //     return [false, 'Email must be between 3 and 256 characters'];
  //   case [true, false, true]:
  //     return [false, 'Email must contain only letters, numbers, underscores, and periods'];
  //   case [true, true, false]:
  //     return [false, 'Email must be in the format: <username>@<domain>.<tld>'];
  if (properLength && properCharacters && emailFormat) {
    return [true, ""];
  } else if (!properLength && properCharacters && emailFormat) {
    return [false, "Email must be between 3 and 256 characters long"];
  } else if (properLength && !properCharacters && emailFormat) {
    return [
      false,
      "Email must only contain alphanumeric characters or underscores",
    ];
  } else if (properLength && properCharacters && !emailFormat) {
    return [false, `Email must be in the format of <user>@<domain>.<tld>`];
  } else if (!properLength && !properCharacters && emailFormat) {
    return [
      false,
      "Email must be between 3 and 256 characters long and contain only letters, numbers, underscores, and periods",
    ];
  } else if (!properLength && properCharacters && !emailFormat) {
    return [
      false,
      "Email must be between 3 and 256 characters long and be in the format: <username>@<domain>.<tld>",
    ];
  } else if (properLength && !properCharacters && !emailFormat) {
    return [
      false,
      "Email must contain only letters, numbers, underscores, and periods and be in the format: <username>@<domain>.<tld>",
    ];
  } else {
    return [
      false,
      "Email must be between 3 and 256 characters, contain only letters, numbers, underscores, and periods, and be in the format: <username>@<domain>.<tld>",
    ];
  }
}

export function isValidPassword(password: string): [boolean, string] {
  const properLength = password.length > 3 && password.length < 256;
  switch (properLength) {
    case true:
      return [true, ""];
    case false:
    default:
      return [false, "Password must be between 3 and 256 characters"];
  }
}
