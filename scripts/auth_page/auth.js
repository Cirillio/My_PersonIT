function generateUniqueId() {
  return Date.now().toString();
}

function addUser(user) {
  const users = getUsers();
  user.id = generateUniqueId();
  console.table(users);
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  const current = {
    id: user.id,
    username: user.username,
  };
  sessionStorage.setItem("currentUser", JSON.stringify(current));
}

function logIn(user) {
  const users = getUsers();
  users.forEach((u) => {
    if (u.username === user.username) {
      user.id = u.id;
    }
  });
  sessionStorage.setItem("currentUser", JSON.stringify(user));
}

function logOut() {
  const currentUser = sessionStorage.getItem("currentUser");
  if (currentUser) sessionStorage.removeItem("currentUser");
}

function getUsers() {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
}

function checkAuth() {
  const currentUser = sessionStorage.getItem("currentUser");
  if (currentUser) return JSON.parse(currentUser);
  return null;
}

const Auth = {
  check: checkAuth,
  logOut: logOut,
  addUser: addUser,
  getUsers: getUsers,
  logIn: logIn,
};

export default Auth;
