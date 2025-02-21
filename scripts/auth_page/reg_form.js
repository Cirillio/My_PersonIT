import Error from "./error_msg.js";
import {
  debounce,
  includes,
  remove,
  every,
} from "https://cdn.jsdelivr.net/npm/lodash-es/lodash.min.js";

document.addEventListener("DOMContentLoaded", () => {
  const regForm = document.querySelector(".register"),
    regSubmit = document.querySelector("#register_submit"),
    regTroubles = document.querySelector("#register_trouble");

  Error.btn = regSubmit;

  const regName = document.getElementById("register_username"),
    regPhone = document.getElementById("register_phone"),
    regPass = document.getElementById("register_password"),
    regConfirm = document.getElementById("confirm_password");

  let wrongList = [];
  const wrongNameMsg =
      "Name must contain only letters and be longer than 3 characters",
    wrongPhoneMsg = "Phone number is invalid",
    wrongPassMsg =
      "Password must be at least 8 characters long and include uppercase and lowercase letters and numbers",
    unequalPassMsg = "Passwords do not match",
    usernameExistsMsg = "Such a user already exists",
    phoneExistsMsg = "Such a phone already uses";

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
    const valid = nameRegex.test(regName.value);
    if (valid) {
      inputErrorToggle(regName, true);
      remove(wrongList, (item) => item === wrongNameMsg);
      return true;
    } else {
      inputErrorToggle(regName, false);
      if (!includes(wrongList, wrongNameMsg)) wrongList.push(wrongNameMsg);
      return false;
    }
  };

  const validatePhone = () => {
    const phoneRegex = /^\+?[78][-(]?\d{3}\)?[-]?\d{3}[-]?\d{2}[-]?\d{2}$/;
    const valid = phoneRegex.test(regPhone.value);
    if (valid) {
      inputErrorToggle(regPhone, true);
      remove(wrongList, (item) => item === wrongPhoneMsg);
      return true;
    } else {
      inputErrorToggle(regPhone, false);
      if (!includes(wrongList, wrongPhoneMsg)) wrongList.push(wrongPhoneMsg);
      return false;
    }
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const valid = passwordRegex.test(regPass.value);
    if (valid) {
      inputErrorToggle(regPass, true);
      remove(wrongList, (item) => item === wrongPassMsg);
      return true;
    } else {
      inputErrorToggle(regPass, false);
      if (!includes(wrongList, wrongPassMsg)) wrongList.push(wrongPassMsg);
      return false;
    }
  };

  const validateConfirmPassword = () => {
    const valid = regPass.value === regConfirm.value;
    if (valid) {
      inputErrorToggle(regConfirm, true);
      remove(wrongList, (item) => item === unequalPassMsg);
      return true;
    } else {
      inputErrorToggle(regConfirm, false);
      if (!includes(wrongList, unequalPassMsg)) wrongList.push(unequalPassMsg);
      return false;
    }
  };

  regName.addEventListener(
    "input",
    debounce(() => validateName(), 500)
  );

  regPhone.addEventListener(
    "input",
    debounce(() => validatePhone(), 500)
  );

  regPass.addEventListener(
    "input",
    debounce(() => validatePassword(), 500)
  );

  function runValidations() {
    const valid = every(
      [
        validateName(),
        validatePhone(),
        validatePassword(),
        validateConfirmPassword(),
      ],
      (fn) => fn
    );

    if (!valid) throw "wrong form";
  }

  function validUser(user) {
    const users = getUsers();

    remove(wrongList, (item) => item === usernameExistsMsg);
    remove(wrongList, (item) => item === phoneExistsMsg);

    if (users.some((u) => u.username === user.username)) {
      console.error("name uses");
      inputErrorToggle(regName, false);
      if (!includes(wrongList, usernameExistsMsg))
        wrongList.push(usernameExistsMsg);
      throw "That name has already been taken";
    } else if (users.some((u) => u.phone === user.phone)) {
      console.error("phone uses");
      inputErrorToggle(regPhone, false);
      if (!includes(wrongList, phoneExistsMsg)) wrongList.push(phoneExistsMsg);
      throw "That phone has already been used";
    }
  }

  regSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      runValidations();

      const user = {
        username: regName.value,
        phone: regPhone.value,
        pass: regPass.value,
      };

      validUser(user);
      addUser(user);
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

  function addUser(user) {
    const users = getUsers();
    users.push(user);
    console.table(users);
    localStorage.setItem("users", JSON.stringify(users));
    sessionStorage.setItem("currentUser", user.username);
  }

  function clearForm() {
    regName.value = "";
    regPhone.value = "";
    regPass.value = "";
    regConfirm.value = "";
  }

  document.onclick = () => {
    Error.hide();
  };
});
