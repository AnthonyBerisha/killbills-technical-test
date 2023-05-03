const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

function isEmail(email: string): boolean {
  return email.match(EMAIL_REGEX) !== null;
}

export { isEmail };
