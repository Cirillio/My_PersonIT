import {
  includes,
  remove,
} from "https://cdn.jsdelivr.net/npm/lodash-es/lodash.min.js";

const wrongForm = document.getElementById("wrong_form");
let formBtn = null;
let wrongLoad = null;
let errorMsgTimeout;
let errorHideTimeout;
let errors = [];

const errorMsg = {
  name: "Name must contain only letters and be longer than 3 characters. Or use another name",
  phone: "Phone number is invalid. Or use another phone",
  password:
    "Password must be at least 8 characters long and include uppercase and lowercase letters and numbers",
  confirm: "Passwords do not match",
  email: "Email is invalid. Or use another email",
  loginName: "User not found",
  loginPass: "Incorrect password",
};

function addError(input_name) {
  const error = errorMsg[input_name];
  if (!includes(errors, error)) errors.push(error);
}

function removeError(input_name) {
  const error = errorMsg[input_name];
  remove(errors, (item) => item === error);
}

function showErrorMsgs() {
  if (!formBtn) console.log("button to submit not added");
  if (wrongLoad) return;
  clearTimeout(errorHideTimeout);
  formBtn.disabled = true;

  errors.forEach((item) => addErrorMsg(item));

  addLoading();

  wrongForm.classList.remove("-top-60");
  wrongForm.classList.add("top-20");

  errorMsgTimeout = setTimeout(() => {
    hideErrorMsgs();
  }, 5000);
}

function addLoading() {
  wrongLoad = document.createElement("div");
  wrongLoad.classList.add("error_load");
  wrongForm.appendChild(wrongLoad);
}

function addErrorMsg(msg) {
  const error = document.createElement("p");
  error.className = "mx-10 pl-2 border-l border-l-red-500";
  error.textContent = msg;
  wrongForm.appendChild(error);
}

function hideErrorMsgs() {
  if (!wrongLoad) return;
  wrongForm.classList.add("-top-60");
  wrongForm.classList.remove("top-20");
  errorHideTimeout = setTimeout(() => clearWrongForm(), 500);
}

function clearWrongForm() {
  formBtn.disabled = false;
  wrongForm.removeChild(wrongLoad);
  clearTimeout(errorMsgTimeout);
  wrongLoad = null;
  wrongForm.innerHTML = "";
  errors = [];
}

document.onclick = () => {
  hideErrorMsgs();
};

const Error = {
  get error() {
    return errorMsg;
  },
  set error(newError) {
    errorMsg = newError;
  },
  get btn() {
    return formBtn;
  },
  set btn(newBtn) {
    formBtn = newBtn;
  },

  add: addError,
  remove: removeError,
  show: showErrorMsgs,
  hide: hideErrorMsgs,
};

export default Error;
