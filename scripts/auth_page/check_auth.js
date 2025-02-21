function checkAuth() {
  const currentUser = sessionStorage.getItem("currentUser");
  if (currentUser) return currentUser;
  return null;
}

function logOut() {
  const currentUser = sessionStorage.getItem("currentUser");
  if (currentUser) sessionStorage.removeItem("currentUser");
}

const Auth = {
  check: checkAuth,
  logOut: logOut,
};

export default Auth;
