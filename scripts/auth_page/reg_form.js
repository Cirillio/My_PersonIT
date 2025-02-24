import Error from "./error_msg.js";
import Auth from "./auth.js";
import Valid from "../valid_input.js";
import { debounce } from "https://cdn.jsdelivr.net/npm/lodash-es/lodash.min.js";

document.addEventListener("DOMContentLoaded", () => {
  const regForm = document.querySelector(".register"),
    regSubmit = document.querySelector("#register_submit"),
    regTroubles = document.querySelector("#register_trouble");

  Error.btn = regSubmit;

  const regName = document.getElementById("register_username"),
    regPhone = document.getElementById("register_phone"),
    regPass = document.getElementById("register_password"),
    regConfirm = document.getElementById("confirm_password");

  regName.addEventListener(
    "input",
    debounce(() => Valid.validateName(regName), 500)
  );

  regPhone.addEventListener(
    "input",
    debounce(() => Valid.validatePhone(regPhone), 500)
  );

  regPass.addEventListener(
    "input",
    debounce(() => Valid.validatePassword(regPass), 500)
  );

  function Reg() {
    try {
      Valid.validateReg(regName, regPhone, regPass, regConfirm);
      const user = {
        username: regName.value,
        phone: regPhone.value,
        pass: regPass.value,
      };

      Auth.addUser(user);
      clearForm();
      window.location.href = "index.html";
    } catch (error) {
      Error.show();
    }
  }

  regSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    Reg();
  });

  function clearForm() {
    regName.value = "";
    regPhone.value = "";
    regPass.value = "";
    regConfirm.value = "";
  }
});
