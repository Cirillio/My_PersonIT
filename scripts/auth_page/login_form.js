import Error from "./error_msg.js";
import {
  debounce,
  includes,
  remove,
  every,
} from "https://cdn.jsdelivr.net/npm/lodash-es/lodash.min.js";
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".login"),
    loginUsername = loginForm.querySelector("#login_username"),
    loginPassword = loginForm.querySelector("#login_password"),
    loginSubmit = loginForm.querySelector("#login_submit");

  Error.btn = loginSubmit;

  const recoverToggle = document.querySelector("#recover_toggle"),
    recoverTel = document.querySelector("#recover_tel"),
    recoverSubmit = document.querySelector("#recover_submit"),
    recoverForm = document.querySelector(".recover");

  let _recoverToggle = false;

  let wrongList = [];

  const wrongNameMsg =
      "Name must contain only letters and be longer than 3 characters",
    wrongPassMsg =
      "Password must be at least 8 characters long and include uppercase and lowercase letters and numbers",
    usernameNotExistsMsg = "User not exists",
    incorrectPassMsg = "Incorrect password";

  function inputErrorToggle(target, toggle) {
    if (toggle) {
      target.classList.add("border-gray-300");
      target.classList.remove("border-red-500");
    } else {
      target.classList.remove("border-gray-300");
      target.classList.add("border-red-500");
    }
  }

  const validateName = () => {
    const nameRegex = /^[a-zA-Zа-яА-ЯёЁ]{3,}$/;
    const valid = nameRegex.test(loginUsername.value);
    if (valid) {
      inputErrorToggle(loginUsername, true);
      remove(wrongList, (item) => item === wrongNameMsg);
      return true;
    } else {
      inputErrorToggle(loginUsername, false);
      if (!includes(wrongList, wrongNameMsg)) wrongList.push(wrongNameMsg);
      return false;
    }
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const valid = passwordRegex.test(loginPassword.value);
    if (valid) {
      inputErrorToggle(loginPassword, true);
      remove(wrongList, (item) => item === wrongPassMsg);
      return true;
    } else {
      inputErrorToggle(loginPassword, false);
      if (!includes(wrongList, wrongPassMsg)) wrongList.push(wrongPassMsg);
      return false;
    }
  };

  loginUsername.addEventListener(
    "input",
    debounce(() => validateName(), 500)
  );

  loginPassword.addEventListener(
    "input",
    debounce(() => validatePassword(), 500)
  );

  function runValidations() {
    const valid = every([validateName(), validatePassword()], (fn) => fn);

    if (!valid) throw "wrong form";
  }

  function validUser(user) {
    remove(wrongList, (item) => item === usernameNotExistsMsg);

    const users = getUsers();
    const _user = users.find((u) => u.username === user.username);
    if (!_user) {
      console.error("name not uses ");
      inputErrorToggle(loginUsername, false);
      if (!includes(wrongList, usernameNotExistsMsg))
        wrongList.push(usernameNotExistsMsg);
      throw "That name has not been taken";
    } else if (_user.pass !== user.pass) {
    }
  }

  function validPass(user) {
    remove(wrongList, (item) => item === incorrectPassMsg);

    const users = getUsers();
    const _user = users.find((u) => u.pass === user.pass);

    if (!_user) {
      console.error("pass is wrong");
      inputErrorToggle(loginPassword, false);
      if (!includes(wrongList, incorrectPassMsg))
        wrongList.push(incorrectPassMsg);
      throw "User`s password incorrect";
    }
  }

  loginSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      runValidations();

      const user = {
        username: loginUsername.value,
        pass: loginPassword.value,
      };

      validUser(user);
      validPass(user);
      logIn(user.username);
      clearForm();
      window.location.href = "index.html";
    } catch (error) {
      Error.list = wrongList;
      Error.show();
    }
  });

  function getUsers() {
    const users = localStorage.getItem("users");

    return users ? JSON.parse(users) : [];
  }

  function logIn(name) {
    sessionStorage.setItem("currentUser", name);
  }

  function clearForm() {
    loginUsername.value = "";
    loginPassword.value = "";
  }

  ////////////

  function recoverShow() {
    recoverForm.classList.remove("opacity-0");
    recoverForm.classList.add("opacity-100");

    loginUsername.disabled = true;
    loginPassword.disabled = true;
    loginSubmit.disabled = true;
  }

  function recoverHide() {
    recoverForm.classList.remove("opacity-100");
    recoverForm.classList.add("opacity-0");

    loginUsername.disabled = false;
    loginPassword.disabled = false;
    loginSubmit.disabled = false;
  }

  recoverToggle.onclick = () => {
    _recoverToggle ? recoverHide() : recoverShow();
    _recoverToggle = !_recoverToggle;
  };
});
