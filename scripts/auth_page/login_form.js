document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".login"),
    loginUsername = loginForm.querySelector("#login_username"),
    loginPassword = loginForm.querySelector("#login_password"),
    loginSubmit = loginForm.querySelector("#login_submit");

  const recoverToggle = document.querySelector("#recover_toggle"),
    recoverTel = document.querySelector("#recover_tel"),
    recoverSubmit = document.querySelector("#recover_submit"),
    recoverForm = document.querySelector(".recover");

  let _recoverToggle = false;

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
