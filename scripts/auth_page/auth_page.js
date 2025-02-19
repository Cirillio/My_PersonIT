document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const formParam = urlParams.get("form");

  const contentBlock = document.getElementById("main");
  const elementRect = contentBlock.getBoundingClientRect();
  const absoluteElementTop = elementRect.top + window.pageYOffset;
  const middleOfElement = absoluteElementTop + elementRect.height / 2;
  const offset = middleOfElement - window.innerHeight / 2;

  window.scrollTo({
    top: offset,
    behavior: "smooth",
  });

  const toggleLogin = document.getElementById("toggle-login"),
    toggleReg = document.getElementById("toggle-reg");

  const loginForm = document.querySelector(".login-form"),
    regForm = document.querySelector(".reg-form");

  const ToggleLogin = () => {
    // history.pushState({}, "", "/authorization.html?form=login");

    regForm.classList.add("right-[200%]");
    regForm.classList.remove("right-1/2");

    loginForm.classList.remove("left-[200%]");
    loginForm.classList.add("left-1/2");
  };

  const ToggleReg = () => {
    // history.pushState({}, "", "/authorization.html?form=reg");

    loginForm.classList.add("left-[200%]");
    loginForm.classList.remove("left-1/2");

    regForm.classList.remove("right-[200%]");
    regForm.classList.add("right-1/2");
  };

  toggleLogin.onclick = () => ToggleLogin();
  toggleReg.onclick = () => ToggleReg();

  if (formParam === "login") {
    ToggleLogin();
    loginForm.classList.add("flex");
    loginForm.classList.remove("hidden");
  } else {
    ToggleReg();
    regForm.classList.add("flex");
    regForm.classList.remove("hidden");
  }

  setTimeout(() => {
    loginForm.classList.add("duration-500");
    regForm.classList.add("duration-500");
    if (formParam === "login") {
      regForm.classList.add("flex");
      regForm.classList.remove("hidden");
    } else {
      loginForm.classList.add("flex");
      loginForm.classList.remove("hidden");
    }
  }, 1);
});
