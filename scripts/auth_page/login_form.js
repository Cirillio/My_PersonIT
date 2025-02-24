import Error from "./error_msg.js";
import Auth from "./auth.js";
import Valid from "../valid_input.js";
import { debounce } from "https://cdn.jsdelivr.net/npm/lodash-es/lodash.min.js";
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

  loginUsername.addEventListener(
    "input",
    debounce(() => Valid.validateName(loginUsername), 500)
  );

  loginPassword.addEventListener(
    "input",
    debounce(() => Valid.validatePassword(loginPassword), 500)
  );

  function Login() {
    try {
      Valid.validateLogin(loginUsername, loginPassword);
      const user = {
        username: loginUsername.value,
      };
      Auth.logIn(user);
      clearForm();
      window.location.href = "index.html";
    } catch (error) {
      Error.show();
    }
  }

  loginSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    Login();
  });

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
