export const validateLogin = (login, password) => {
  if (login === "admin" && password === "admin") {
    return true;
  } else {
    return false;
  }
};
