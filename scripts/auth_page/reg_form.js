import Error from "./error_msg.js";
import {
  debounce,
  includes,
  remove,
} from "https://cdn.jsdelivr.net/npm/lodash-es/lodash.min.js";

document.addEventListener("DOMContentLoaded", () => {
  const regForm = document.querySelector(".register"),
    regSubmit = document.querySelector("#register_submit"),
    regTroubles = document.querySelector("#register_trouble");

  let formValid = true;

  Error.btn = regSubmit;

  const regName = document.getElementById("register_username"),
    regPhone = document.getElementById("register_phone"),
    regPass = document.getElementById("register_password"),
    regConfirm = document.getElementById("confirm_password");

  let wrongList = [];
  const wrongNameMsg =
      "Имя должно содержать только буквы и быть больше 3 символов",
    wrongPhoneMsg = "Телефон указан неверно",
    wrongPassMsg =
      "Пароль должен содержать минимум 8 символов, включая заглавные и строчные буквы и цифры",
    unequalPassMsg = "Пароли не совпадают";

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
    console.log(valid);
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

  function inputErrorToggle(target, toggle) {
    if (toggle) {
      target.classList.add("border-gray-300");
      target.classList.remove("border-red-500");
    } else {
      target.classList.remove("border-gray-300");
      target.classList.add("border-red-500");
    }
  }

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

  regSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    const valid =
      validateName() &&
      validatePhone() &&
      validatePassword() &&
      validateConfirmPassword();

    if (!valid) {
      Error.list = wrongList;
      Error.show();
    } else {
      const user = {
        username: regName.value,
        phone: regPhone.value,
        pass: regPass.value,
      };

      register(user);

      regName.value = "";
      regPhone.value = "";
      regPass.value = "";
      regConfirm.value = "";

      // Submit the form or perform further actions
    }
  });

  function register(user) {
    console.log(JSON.stringify(user));
  }

  document.onclick = () => {
    Error.hide();
  };
});
