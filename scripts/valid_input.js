import Error from "./auth_page/error_msg.js";
import Auth from "./auth_page/auth.js";
import { every } from "https://cdn.jsdelivr.net/npm/lodash-es/lodash.min.js";
function inputErrorToggle(input, toggle) {
  if (toggle) {
    input.classList.add("border-gray-300");
    input.classList.remove("border-red-500");
  } else {
    input.classList.remove("border-gray-300");
    input.classList.add("border-red-500");
  }
}
function toggleInput(input, valid) {
  if (valid) {
    inputErrorToggle(input, true);
    Error.remove(input.name);
    return true;
  } else {
    inputErrorToggle(input, false);
    Error.add(input.name);
    return false;
  }
}

const validateFindUser = (input) => {
  const users = Auth.getUsers();
  const valid = users.some((u) => u.username === input.value);
  return toggleInput(input, valid);
};

const validateName = (input) => {
  const users = Auth.getUsers();

  const nameRegex = /^[a-zA-Zа-яА-ЯёЁ]{3,}$/;
  const valid = nameRegex.test(input.value);

  return toggleInput(input, valid);
};

const validatePhone = (input) => {
  const users = Auth.getUsers();

  const phoneRegex = /^\+?[78][-(]?\d{3}\)?[-]?\d{3}[-]?\d{2}[-]?\d{2}$/;
  const valid =
    phoneRegex.test(input.value) && !users.some((u) => u.phone === input.value);

  return toggleInput(input, valid);
};

const validatePassword = (input) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  const valid = passwordRegex.test(input.value);
  return toggleInput(input, valid);
};

const validateConfirmPassword = (input_1, input_2) => {
  const valid =
    input_1.value === input_2.value &&
    (input_1.value !== "" || input_2.value !== "");
  return toggleInput(input_2, valid);
};

function validateReg(name, phone, pass, confirm) {
  const valid = every(
    [
      validateName(name),
      validatePhone(phone),
      validatePassword(pass),
      validateConfirmPassword(pass, confirm),
    ],
    (fn) => fn
  );

  if (!valid) throw "Wrong form Error.";
}

function validateLogin(name, pass) {
  const valid = every(
    [validateName(name), validatePassword(pass), validateFindUser(name)],
    (fn) => fn
  );
  const users = Auth.getUsers();
  const _user = users.find((u) => u.username === name.value);
  if (!_user) {
    toggleInput(name, false);
    valid = false;
  } else if (_user.pass !== pass.value) {
    toggleInput(pass, false);
    valid = false;
  }

  if (!valid) throw "Wrong form Error.";
}

const Valid = {
  validateName,
  validatePhone,
  validatePassword,
  validateConfirmPassword,
  validateReg,
  validateLogin,
};

export default Valid;
