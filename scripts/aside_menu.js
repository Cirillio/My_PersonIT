document.addEventListener("DOMContentLoaded", () => {
  const aside = document.querySelector("aside");
  const aside_bg = document.querySelectorAll("aside div")[0];
  const aside_menu = document.querySelectorAll("aside div")[1];
  const open_aside = document.getElementById("open-aside");
  const close_aside = aside_menu.querySelector("button");

  function OpenAside() {
    disableScroll();

    aside.classList.remove("hidden");
    aside.classList.add("block");

    setTimeout(() => {
      aside_menu.classList.remove("translate-x-full");
      aside_menu.classList.add("translate-x-0");

      aside_bg.classList.remove("opacity-0");
      aside_bg.classList.add("opacity-50");
    }, 1);
  }

  function CloseAside() {
    enableScroll();
    aside_menu.classList.remove("translate-x-0");
    aside_menu.classList.add("translate-x-full");

    aside_bg.classList.remove("opacity-50");
    aside_bg.classList.add("opacity-0");
    aside.classList.remove("block");
    setTimeout(() => {
      aside.classList.add("hidden");
    }, 100);
  }

  if (aside_menu && close_aside) {
    open_aside.onclick = () => OpenAside();
    close_aside.onclick = () => CloseAside();
    aside_bg.onclick = () => CloseAside();
  } else {
    console.error("aside not found");
  }

  function disableScroll() {
    document.body.style.overflow = "hidden";
  }

  function enableScroll() {
    document.body.style.overflow = "";
  }
});
