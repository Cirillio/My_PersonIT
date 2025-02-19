const wrongForm = document.getElementById("wrong_form");
let formBtn = null;
let wrongLoad = null;
let errorMsgTimeout;
let errorHideTimeout;
let errors = [];

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

const Error = {
  get btn() {
    return formBtn;
  },
  set btn(newBtn) {
    formBtn = newBtn;
  },
  get list() {
    return errors;
  },
  set list(newErrors) {
    errors = newErrors;
  },
  show: showErrorMsgs,
  hide: hideErrorMsgs,
};

export default Error;
