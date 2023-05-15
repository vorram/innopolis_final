function validateEmail(email) {
  const regEx = /[^\s@]+@[^\s@]+\.[^\s@]+/;

  return regEx.test(email.toLowerCase());
}

export default validateEmail;
