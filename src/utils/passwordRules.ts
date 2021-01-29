export const checkPasswordRules = (password: string): boolean => {
  if (password.length < 8 || password.length > 512) {
    return false;
  }
  const lowercase = password.match(/[a-z]/);
  const uppercase = password.match(/[A-Z]/);
  const number = password.match(/\d/);
  const symbol = password.match(/\W/);

  let counter = 0;
  if (lowercase) {
    counter++;
  }
  if (uppercase) {
    counter++;
  }
  if (number) {
    counter++;
  }
  if (symbol) {
    counter++;
  }
  return counter > 2;
}
