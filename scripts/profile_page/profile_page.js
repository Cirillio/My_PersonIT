import Auth from "../auth_page/auth.js";
import Valid from "../valid_input.js";
import Error from "../auth_page/error_msg.js";
import { debounce } from "https://cdn.jsdelivr.net/npm/lodash-es/lodash.min.js";

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
    window.location.href = "authorization.html?form=login";
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

  const logOutBtn = document.getElementById("logOut");

  logOutBtn.onclick = () => {
    Auth.logOut();
    location.reload();
  };

  Error.btn = _saveProfile;

  _editProfile.addEventListener("click", (e) => {
    e.preventDefault();
    editProfileToggle();
    profileName.value = user.username;
    profilePhone.value = user.phone;
    profileEmail.value = !user.email ? "not set" : user.email;
  });

  _saveProfile.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    saveProfileClick();
  });

  function saveProfileClick() {
    try {
      if (
        profileName.value !== user.username &&
        !Valid.checkName(profileName)
      ) {
        throw "Username already used";
      }
      console.log("1");

      if (
        profilePhone.value !== user.phone &&
        !Valid.checkPhone(profilePhone)
      ) {
        throw "Phone already used";
      }
      console.log("2");

      if (
        profileEmail.value !== user.email &&
        !Valid.checkEmail(profileEmail)
      ) {
        throw "Email already used";
      }
      console.log("3  ");

      user.username = profileName.value;
      user.phone = profilePhone.value;
      user.email = !profileEmail.value ? "not set" : profileEmail.value;
      saveProfile(user);
      editProfileToggle();
    } catch (error) {
      Error.show();
    }
  }

  function editProfileToggle() {
    profileName.disabled = !profileName.disabled;
    profilePhone.disabled = !profilePhone.disabled;
    profileEmail.disabled = !profileEmail.disabled;
    _saveProfile.disabled = !_saveProfile.disabled;

    Valid.inputErrorToggle(profileName, true);
    Valid.inputErrorToggle(profilePhone, true);
    Valid.inputErrorToggle(profileEmail, true);
  }

  profileName.addEventListener(
    "input",
    debounce((e) => {
      if (e.target.value === user.username) return;
      Valid.validateName(profileName);
    }, 500)
  );

  profilePhone.addEventListener(
    "input",
    debounce((e) => {
      if (e.target.value === user.phone) return;
      Valid.validatePhone(profilePhone);
    }, 500)
  );

  profileEmail.addEventListener(
    "input",
    debounce((e) => {
      if (e.target.value === user.email) return;
      Valid.validateEmail(profileEmail);
    }, 500)
  );

  function saveProfile(user) {
    console.log(user);
    users.forEach((u) => {
      if (u.id === user.id) {
        u = user;
      }
    });
    localStorage.setItem("users", JSON.stringify(users));
    sessionStorage.setItem(
      "currentUser",
      JSON.stringify({
        id: user.id,
        username: user.username,
      })
    );
  }
});
