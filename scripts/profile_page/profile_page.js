import Auth from "../auth_page/auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const contentBlock = document.getElementById("main");
  const elementRect = contentBlock.getBoundingClientRect();
  const absoluteElementTop = elementRect.top + window.pageYOffset;
  const middleOfElement = absoluteElementTop + elementRect.height / 2;
  const offset = middleOfElement - window.innerHeight / 2;

  window.scrollTo({
    top: offset,
    behavior: "smooth",
  });

  const switchButtons = document.querySelectorAll(".switch-btn"),
    menuList = document.querySelectorAll(".menu");

  const currentMenu = {
    menu: menuList[0],
    btn: switchButtons[0],
  };

  for (let i = 0; i < menuList.length; i++) {
    switchButtons[i].addEventListener("click", () => {
      if (switchButtons[i] === currentMenu.btn) return;

      currentMenu.btn.classList.remove("bg-slate-400");
      currentMenu.menu.classList.add("hidden");
      currentMenu.menu.classList.remove("flex");

      switchButtons[i].classList.add("bg-slate-400");
      menuList[i].classList.remove("hidden");
      menuList[i].classList.add("flex");

      currentMenu.btn = switchButtons[i];
      currentMenu.menu = menuList[i];
    });
  }

  const currentUser = Auth.check();
  if (!currentUser) {
    window.location.href = "authorization.html";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users"));
  const user = users.find((u) => u.username === currentUser.username);

  document.title = `24Hotel - ${user.username}`;

  const profileForm = document.querySelector(".profile"),
    profileName = profileForm.querySelector("input[name='name']"),
    profilePhone = profileForm.querySelector("input[name='phone']"),
    profileEmail = profileForm.querySelector("input[name='email']");

  profileName.value = user.username;
  profilePhone.value = user.phone;
  profileEmail.value = !user.email ? "not set" : user.email;

  const _editProfile = document.getElementById("editProfile"),
    _saveProfile = document.getElementById("saveProfile");

  _editProfile.addEventListener("click", (e) => {
    e.preventDefault();
    editProfileToggle();
  });

  function editProfileToggle() {
    profileName.disabled = !profileName.disabled;
    profilePhone.disabled = !profilePhone.disabled;
    profileEmail.disabled = !profileEmail.disabled;
  }

  function saveProfile(user) {
    users.forEach((u) => {
      if (u.id === user.id) {
        u.username = user.username;
        u.phone = user.phone;
        u.email = user.email;
      }
    });
  }
});
